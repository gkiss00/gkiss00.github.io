#include "rt.h"

t_intersection *createIntersection(t_matrix *realIntersection, t_matrix *normal, t_color *color, double dist, double reflectionRatio, t_object *obj) {
    t_intersection *intersection = malloc(sizeof(t_intersection));
    intersection->pointOfIntersection = createPointCpy(realIntersection);
    intersection->normal = createVectorCpy(normal);
    intersection->color = color;
    intersection->distanceFromCamera = dist;
    intersection->reflectionRatio = reflectionRatio;
    intersection->object = obj;
    return intersection;
}

t_listIntersection createListIntersection() {
    t_listIntersection list;
    list.nb = 0;
    list.intersections = NULL;
    return list;
}

void addIntersectionToList(t_listIntersection *list, t_intersection *inter) {
    t_intersection *new = malloc((list->nb + 1) * sizeof(t_intersection));
    int i = 0;
    for(i = 0; i < list->nb; ++i)
        new[i] = list->intersections[i];
    new[i] = *inter;
    free(list->intersections);
    list->intersections = new;
    list->nb++;
}