#include "rt.h"

t_color createColor() {
    t_color color;
    color.r = 1.0;
    color.g = 1.0;
    color.b = 1.0;
    color.a = 1.0;
    return color;
}

t_color createColorRGB(double r, double g, double b) {
    t_color color;
    color.r = r;
    color.g = g;
    color.b = b;
    color.a = 1.0;
    return color;
}

t_color createColorRGBA(double r, double g, double b, double a) {
    t_color color;
    color.r = r;
    color.g = g;
    color.b = b;
    color.a = a;
    return color;
}

t_color createColorCpy(t_color *c) {
    t_color color;
    color.r = c->r;
    color.g = c->g;
    color.b = c->b;
    color.a = c->a;
    return color;
}

void addColor(t_color * color1, t_color *color2) {
    color1->r += color2->r;
    color1->g += color2->g;
    color1->b += color2->b;
}

void divideColor(t_color *color, double d) {
    color->r /= d;
    color->g /= d;
    color->b /= d;
}

int colorToInt(t_color *color) {
    int intRed = min((int) (color->r * 255.0), 255);
    intRed = max(intRed, 0);
    int intGreen = min((int) (color->g * 255.0), 255);
    intGreen = max(intGreen, 0);
    int intBlue = min((int) (color->b * 255.0), 255);
    intBlue = max(intBlue, 0);
    return (int)(intRed * pow(16, 4) + intGreen * pow(16, 2) + intBlue);
}

t_color alphaBlending(t_color *color1, t_color *color2) {
    if(color1->a == 0 && color2->a == 0) 
        return createColorCpy(color1);
    double red, green, blue, alpha;
    alpha = color1->a + (color2->a* (1.0 - color1->a));
    red = ((color1->r * color1->a) + (color2->r * color2->a * (1 - color1->a))) / alpha;
    green = ((color1->g * color1->a) + (color2->g * color2->a * (1 - color1->a))) / alpha;
    blue = ((color1->b * color1->a) + (color2->b * color2->a * (1 - color1->a))) / alpha;
    return createColorRGBA(red, green, blue, alpha);
}

t_color colorReflection(t_color *color1, t_color *color2, double factor) {
    double red, green, blue;
    red = color1->r + (color2->r - color1->r) * factor;
    green = color1->g + (color2->g - color1->g) * factor;
    blue = color1->b + (color2->b - color1->b) * factor;
    return createColorRGBA(red, green, blue, color1->a);
}