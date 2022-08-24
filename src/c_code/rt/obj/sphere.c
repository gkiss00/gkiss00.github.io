#include "../rt.h"
/*
    value[0] = radius;
*/
t_object createSphere(double radius) {
    t_object sphere;
    sphere.type = SPHERE;
    printf("\nsp\n");
    sphere.values[0] = radius;
    printf("\nsp\n");
    return sphere;
}

void hitSphere(t_object *sphere, t_line *ray, t_listIntersection *list) {
    t_line localRay = applyLine(&(sphere->transform), ray, TO_LOCAL);
    normalize(&(localRay.vector));

    double a = 1;
    double b = 2 * localRay.point.tab[0][0] * localRay.vector.tab[0][0] +
            2 * localRay.point.tab[0][1] * localRay.vector.tab[0][1] +
            2 * localRay.point.tab[0][2] * localRay.vector.tab[0][2];
    double c = localRay.point.tab[0][0] * localRay.point.tab[0][0] +
            localRay.point.tab[0][1] * localRay.point.tab[0][1] +
            localRay.point.tab[0][2] * localRay.point.tab[0][2] -
            sphere->values[0] * sphere->values[0];

    t_solution solutions = solve(a, b, c);
    for (int i = 0; i < solutions.nb; ++i) {
        if (solutions.s[i] > EPSILON) {
            t_matrix localIntersection = createPoint();
            localIntersection.tab[0][0] = localRay.point.tab[0][0] + localRay.vector.tab[0][0] * solutions.s[i];
            localIntersection.tab[0][1] = localRay.point.tab[0][1] + localRay.vector.tab[0][1] * solutions.s[i];
            localIntersection.tab[0][2] = localRay.point.tab[0][2] + localRay.vector.tab[0][2] * solutions.s[i];
            t_matrix realIntersection = applyPoint(&(sphere->transform), &localIntersection, TO_REAL);
            t_matrix realNormal = applyVector(&(sphere->transform), &localIntersection, TO_REAL);
            t_intersection *inter = createIntersection(&realIntersection, &realNormal, &(sphere->color), distBetween(&(ray->point), &realIntersection), 0, sphere);
            addIntersectionToList(list, inter);
        }
    }
}

void updateTransform(
    t_object *obj, 
    double alpha, 
    double beta, 
    double gama, 
    double scalingX,
    double scalingY,
    double scalingZ,
    double translationX,
    double translationY,
    double translationZ
) {
    updateMatrices(&(obj->transform), alpha, beta, gama, scalingX, scalingY, scalingZ, translationX, translationY, translationZ);
}