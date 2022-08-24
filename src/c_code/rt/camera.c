#include "rt.h"

t_camera createCamera(t_matrix *pointOfVue, t_matrix *direction, t_matrix *up, double angle) {
    t_camera camera;
    camera.pointOfVue = createMatrixCpy(pointOfVue);
    camera.direction = createMatrixCpy(direction);
    camera.up = createMatrixCpy(up);
    camera.angle = angle;
    return camera;
}

void updateCamera(t_camera *camera, int height, int width) {
    camera->height = height;
    camera->width = width;

    normalize(&(camera->direction));
    camera->U = crossProduct(&(camera->up), &(camera->direction));
    normalize(&(camera->U));
    camera->V = crossProduct(&(camera->U), &(camera->direction));
    normalize(&(camera->V));

    times(&(camera->U), width);
    times(&(camera->V), height);

    double L = width / tan(RADIAN(camera->angle / 2));
    camera->screenCenter = createPointCpy(&(camera->pointOfVue));
    t_matrix tmp = createVectorCpy(&(camera->direction));
    times(&tmp, L);
    addPoint(&(camera->screenCenter), &tmp);
    camera->screenCenter.tab[0][3] = 1;
}

t_matrix getPointFromDouble(t_camera * cam, double h, double w) {
    t_matrix UTmp = createVectorCpy(&(cam->U));
    times(&UTmp, w);
    t_matrix VTmp = createVectorCpy(&(cam->V));
    times(&VTmp, h);
    t_matrix res = createPointCpy(&(cam->screenCenter));
    addPoint(&res, &UTmp);
    addPoint(&res, &VTmp);
    return res;
}

t_matrix getPointFromInt(t_camera * cam, int h, int w) {
    return getPointFromDouble(cam, ((double)h - ((double)(cam->height) / 2)) / cam->height, ((double)w - ((double)(cam->width) / 2)) / cam->width);
}