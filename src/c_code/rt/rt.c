#include "rt.h"

t_config config;

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
    char *file = malloc(n);
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
    free(file);
#endif

    for (int y = 0; y < config->height; ++y)
        free(pixels[y]);
    free(pixels);
    free(config->objects);

#ifdef MAIN
    return NULL;
#else
    return base64_encrypted;
#endif
}

static void createStaticConfig(t_config *c) {
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
    c->antiAliasing = 3;
    c->camera = createCamera(&pointOfVue, &direction, &up, 90);
    updateCamera(&c->camera, c->height, c->width);
    c->nbObj = 1;
}

void updateConfig(t_config *config, char *copyBook) {
    // Image config
    char *height = substr(copyBook, 0, 6);
    char *width = substr(copyBook, 6, 12);
    char *antiAliasing = substr(copyBook, 12, 13);

    config->height = atoi(height);
    config->width = atoi(width);
    config->antiAliasing = atoi(antiAliasing);
    // Filter + 20

    free(height);
    free(width);
    free(antiAliasing);

    // Point of vue of camera
    char *x = substr(copyBook, 33, 39);
    char *y = substr(copyBook, 39, 45);
    char *z = substr(copyBook, 45, 51);

    config->camera.pointOfVue.tab[0][0] = atof(x);
    config->camera.pointOfVue.tab[0][1] = atof(y);
    config->camera.pointOfVue.tab[0][2] = atof(z);

    free(x);
    free(y);
    free(z);

    // Direction of camera
    x = substr(copyBook, 51, 57);
    y = substr(copyBook, 57, 63);
    z = substr(copyBook, 63, 69);

    config->camera.direction.tab[0][0] = atof(x);
    config->camera.direction.tab[0][1] = atof(y);
    config->camera.direction.tab[0][2] = atof(z);

    free(x);
    free(y);
    free(z);

    // Up of camera
    x = substr(copyBook, 69, 75);
    y = substr(copyBook, 75, 81);
    z = substr(copyBook, 81, 87);

    config->camera.up.tab[0][0] = atof(x);
    config->camera.up.tab[0][1] = atof(y);
    config->camera.up.tab[0][2] = atof(z);

    free(x);
    free(y);
    free(z);

    // Angle of the camera
    char *angle = substr(copyBook, 87, 90);
    config->camera.angle = atoi(angle);
    free(angle);

    updateCamera(&config->camera, config->height, config->width);

    // Objects
    char *nbOfObjects = substr(copyBook, 90, 93);
    config->nbObj = atoi(nbOfObjects);
    free(nbOfObjects);

    int index = 93;
    for (int i = 0; i < config->nbObj; ++i) {
        char *type = substr(copyBook, index, index + 10);
        index += 10;
        // SHOULD BE A MAP (linked list)
        t_object *object = createSphereHeap();
        if(strcmp(type, SPHERE_STR) == 0) {
            object = createSphereHeap();
        }
        // SHOULD BE A MAP (linked list)
        int nbOfValues = 1;
        if(strcmp(type, SPHERE_STR) == 0) {
            nbOfValues = 1;
        }
        for(int j = 0; j < nbOfValues; ++j) {
            char *value = substr(copyBook, index, index + 6);
            index += 6;
            double v = atof(value);
            free(value);
            object->values[j] = v;
        }
        // translation
        x = substr(copyBook, index, index + 6);
        index += 6;
        y = substr(copyBook, index, index + 6);
        index += 6;
        z = substr(copyBook, index, index + 6);
        index += 6;

        double translationX = atof(x);
        double translationY = atof(y);
        double translationZ = atof(z);

        free(x);
        free(y);
        free(z);

        // scaling
        x = substr(copyBook, index, index + 6);
        index += 6;
        y = substr(copyBook, index, index + 6);
        index += 6;
        z = substr(copyBook, index, index + 6);
        index += 6;

        double scalingX = atof(x);
        double scalingY = atof(y);
        double scalingZ = atof(z);
        
        free(x);
        free(y);
        free(z);

        // rotation
        x = substr(copyBook, index, index + 6);
        index += 6;
        y = substr(copyBook, index, index + 6);
        index += 6;
        z = substr(copyBook, index, index + 6);
        index += 6;

        double rotationX = atof(x);
        double rotationY = atof(y);
        double rotationZ = atof(z);
        
        free(x);
        free(y);
        free(z);

        object->transform = createTransform();
        updateTransform(
            object, 
            translationX, 
            translationY, 
            translationZ, 
            scalingX, 
            scalingY, 
            scalingZ, 
            rotationX,
            rotationY, 
            rotationZ
        );

        // object color
        char *red = substr(copyBook, index, index + 3);
        index += 3;
        char *green = substr(copyBook, index, index + 3);
        index += 3;
        char *blue = substr(copyBook, index, index + 3);
        index += 3;
        char *alpha = substr(copyBook, index, index + 3);
        index += 3;

        object->color.r = (double)atoi(red) / 255;
        object->color.g = (double)atoi(green) / 255;
        object->color.b = (double)atoi(blue) / 255;
        object->color.a = (double)atoi(alpha) / 255;

        free(red);
        free(green);
        free(blue);
        free(alpha);

        // ADD OBJECT TO LIST
        config->objects = object;
    }
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
    //return res;
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
char *rt(char *copyBook) {
    createStaticConfig(&config);
    updateConfig(&config, copyBook);
    t_color **pixels = malloc(config.height * sizeof(t_color*));
    for(int i = 0; i < config.height;++i) {
        pixels[i] = malloc(config.width * sizeof(t_color));
    }
    for (int y = 0; y < config.height; ++y) {
        for (int x = 0; x < config.width; ++x) {
            t_color *pixelColor = malloc(sizeof(t_color));
            addPixelColor(x, y, pixelColor);
            divideColor(pixelColor, (config.antiAliasing * config.antiAliasing));
            pixels[y][x].r = pixelColor->r;
            pixels[y][x].g = pixelColor->g;
            pixels[y][x].b = pixelColor->b;
            pixels[y][x].a = pixelColor->a;
        }
    }
    return saver(&config, pixels);
}

int main(int argc, char **argv) {
    rt(argv[0]);
}