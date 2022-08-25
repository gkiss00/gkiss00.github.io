#include "rt.h"

t_config config;
t_object sp;

static char *base64_table = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
static char base64_padding = '=';

static int base64(int n, char msg[n], char e[])
{
    char *overlap_free = malloc((strlen(msg)*4 / 3) + 2);

    for (int i = 0; i <= (n-1) / 3; ++i)
    {
        overlap_free[4*i] = base64_table[(uint8_t)msg[3*i] / 4];
        overlap_free[4*i + 1] = base64_table[((uint8_t)msg[3*i] % 4)*16 + (uint8_t)msg[3*i + 1]/16];
        overlap_free[4*i + 2] = base64_table[((uint8_t)msg[3*i + 1] % 16)*4 + (uint8_t)msg[3*i + 2]/64];
        overlap_free[4*i + 3] = base64_table[(uint8_t)msg[3*i + 2] % 64];
    }

    if (n % 3 == 1) overlap_free[4*((n-1)/3) + 2] = base64_padding;
    if (n % 3 == 1 || n % 3 == 2) overlap_free[4*((n-1)/3) + 3] = base64_padding;
    overlap_free[4*((n-1)/3) + 4] = '\0';

    memcpy(e, overlap_free, 4*((n-1)/3) + 5);
    return 4*((n-1)/3) + 4;
}

static char *saver(const t_config *config, t_color **pixels)
{
    int d, n = 26 + (config->width * config->height * 3);
    char file[n];
    unsigned short s;

    memcpy(&file[0], "BM", 2);
    d = n, memcpy(&file[2], &d, 4);
    d = 0, memcpy(&file[6], &d, 4);
    d = 26, memcpy(&file[10], &d, 4);

    d = 12, memcpy(&file[14], &d, 4);
    s = config->width, memcpy(&file[18], &s, 2);
    s = config->height, memcpy(&file[20], &s, 2);
    s = 1, memcpy(&file[22], &s, 2);
    s = 24, memcpy(&file[24], &s, 2);

    for (int y = 0; y < config->height; ++y)
    {
        for (int x = 0; x < config->width; ++x)
        {
            int color = colorToInt(&pixels[y][x]);
            memcpy(&file[26 + ((y * config->width + x) * 3)], &color, 3);
        }
    }

#ifdef MAIN
    FILE *fp = fopen("./image.bmp", "w");
    fwrite(file, 1, n, fp);
    fclose(fp);
#else
    char *base64_encrypted = malloc((n*4 / 3) + 2);
    base64(n, file, base64_encrypted);
#endif

    for (int y = 0; y < config->height; ++y)
        free(pixels[y]);
    free(pixels);

#ifdef MAIN
    return NULL;
#else
    return base64_encrypted;
#endif
}

static void xxx(t_config *c) {
    t_matrix pointOfVue = createPoint();
    pointOfVue.tab[0][0] = -50;
    pointOfVue.tab[0][1] = 0;
    pointOfVue.tab[0][2] = 0;
    t_matrix direction = createVector();
    direction.tab[0][0] = 1;
    direction.tab[0][1] = 0;
    direction.tab[0][2] = 0;
    t_matrix up = createVector();
    up.tab[0][0] = 0;
    up.tab[0][1] = 0;
    up.tab[0][2] = 1;
    c->height = 400;
    c->width = 400;
    c->antiAliasing = 1;
    c->camera = createCamera(&pointOfVue, &direction, &up, 90);
    updateCamera(&c->camera, c->height, c->width);
    c->nbObj = 1;
    c->objects = &sp;
    sp.color = createColorRGBA(1, 0, 0, 1);
    c->objects[0].transform = createTransform();
    updateTransform(&sp, 0, 0, 0, 1, 1, 1, 0, 0, 0);
}

static t_listIntersection getIntersections(t_line *ray) {
    t_listIntersection intersections = createListIntersection();
    for (int i = 0; i < config.nbObj; ++i) {
        hitSphere(&(config.objects[i]), ray, &intersections);
    }
    return intersections;
}

static void sortIntersections(t_listIntersection *list) {
    for (int i = 0; i < list->nb - 1; ++i) {
        bool swapped = false;
        for (int j = 0; j < list->nb - i - 1; ++j) {
            if (list->intersections[j].distanceFromCamera > list->intersections[j + 1].distanceFromCamera) {
                t_intersection tmp = list->intersections[j];
                list->intersections[j] = list->intersections[j + 1];
                list->intersections[j + 1] = tmp;
                swapped = true;
            }
        }
        if(!swapped)
            break;
    }
}

static t_color getPixelColor(t_line *ray, int reflectionDeepness) {
    // FIND INTERSECTIONS
    t_listIntersection intersections = getIntersections(ray);
    sortIntersections(&intersections);

    // COMPUTE COLOR
    t_color res = createColorRGBA(0, 0, 0, 0);
    int size = intersections.nb;
    for(int i = 0; i < size; ++i) {
        t_intersection intersection = intersections.intersections[i];
        t_color *tmp = intersection.color;
        
        // // LIGHTS
        // tmp = applyLights(intersection, tmp);
        // tmp = applyAmbientLight(intersection, tmp);
        if(res.a == 0)
            res = createColorCpy(tmp);
        else
            res = alphaBlending(&res, tmp);
        if(res.a > 1.0 - EPSILON) {
            break;
        }
    }
    //free(intersections.intersections);
    return res;
}

static void addPixelColor(int x, int y, t_color *pixelColor) {
    for (int h = 0; h < config.antiAliasing; ++h) {
        for (int w = 0; w < config.antiAliasing; ++w) {
            double heightRatio = (y - (double)config.height / 2.0 + 0.5) / config.height + 
            ((1.0 / config.height) / config.antiAliasing) * h;
            double widthRatio = (x - (double)config.width / 2.0 + 0.5) / config.width + 
            ((1.0 / config.width) / config.antiAliasing) * w;
            t_matrix tmp = getPointFromDouble(&(config.camera), heightRatio, widthRatio);
            t_line ray = createLineFromTwoPoints(&(config.camera.pointOfVue), &tmp);
            normalize(&(ray.vector));
            t_color c = getPixelColor(&ray, 0);
            addColor(pixelColor, &c);
        }
    }
}

EMSCRIPTEN_KEEPALIVE
char *rt() {
    sp = createSphere(10);
    xxx(&config);
    t_color **pixels = malloc(config.height * sizeof(t_color*));
    for(int i = 0; i < config.height;++i) {
        pixels[i] = malloc(config.width * sizeof(t_color));
    }
    for (int y = 0; y < config.height; ++y) {
        for (int x = 0; x < config.width; ++x) {
            t_color pixelColor = {0};
            addPixelColor(x, y, &pixelColor);
            divideColor(&pixelColor, (config.antiAliasing * config.antiAliasing));
            pixels[y][x] = pixelColor;
        }
    }
    return saver(&config, pixels);
    return NULL;
}

int main(int argc, char **agrv) {
    rt();
}