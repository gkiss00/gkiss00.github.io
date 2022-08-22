#include "rt.h"

t_listIntersection getIntersections(t_line *ray, t_config *config) {
    
} 

EMSCRIPTEN_KEEPALIVE
char *rt(char *scene) {
    t_config config;
    for (int y = 0; y < config.height; ++y) {
        for (int x = 0; x < config.width; ++x) {
            t_color color;
            addPixelColor(x, y, pixelColor);
            pixelColor.divide(config.ANTI_ALIASING * config.ANTI_ALIASING);
            Filter.applyFilter(pixelColor, config.filter);
            if(shouldUpdateBuffer)
                buffer.setRGB(x, y, pixelColor.toInt());
            if(shouldUpdateServer)
                senColorToServer(x, y, pixelColor);
        }
    }
    return NULL;
}