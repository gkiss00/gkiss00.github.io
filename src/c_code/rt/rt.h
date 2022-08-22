#ifndef RT_H
#define RT_H

#include <string.h>
#include <stdlib.h>
#include <stdio.h>
#include <math.h>
#include <stdarg.h>
#include <emscripten/emscripten.h>

#define RADIAN(n) ((n) * (2 * M_PI / 360))
#define DEGREE(n) (n * (360 / (2 * M_PI)))

#define SPHERE 1

#define TO_LOCAL 1
#define TO_REAL 2

typedef struct s_color {
    double r;
    double g;
    double b;
    double a;
}   t_color;

typedef struct s_matrix {
    int col;
    int row;
    double **tab;
}   t_matrix;

typedef struct s_transform {
    t_matrix *toLocalMatrix;
    t_matrix *toRealMatrix;
    t_matrix *realOrigin;
    t_matrix *localOrigin;
}   t_transform;

typedef struct s_line {
    t_matrix *point;
    t_matrix *vector;
}   t_line;

typedef struct s_object {
    int type;
    int values[5];
    t_color *color;
    t_transform *transform;
}   t_object;

typedef struct s_config {
    int width;
    int height;
    int antiAliasing;
    int nbObj;
    t_object *objects;
}   t_config;

typedef struct s_intersection {
    t_matrix *pointOfIntersection;
    t_matrix *normal;
    t_color *color;
    double distanceFromCamera;
    double reflectionRatio;
    t_obj *object;
}   t_intersection;

typedef struct s_listIntersection {
    int nb;
    t_intersection *intersections;
}   t_listIntersection;

// MATRIX
t_matrix *createPoint();
t_matrix *createVector();
t_matrix *createMatrix(int col, int row);
t_matrix *createMatrixCpy(t_matrix *m);
void setValueToMatrix(t_matrix *matrix, int col, int row, double value);
double getDeterminant(t_matrix *matrix);
t_matrix *getSubMatrixRowed(int n, t_matrix *m);
void unit(t_matrix *matrix);
void transpose(t_matrix *m);
void copyMatrix(t_matrix *from, t_matrix *to);
void adjugate(t_matrix *m);
t_matrix *getSubMatrix(t_matrix *m, int c, int r);
void inverse(t_matrix *m);
t_matrix *add(t_matrix *matrix1, t_matrix *matrix2);
t_matrix *mult(t_matrix *matrix1, t_matrix *matrix2);
t_matrix *multMany(int nb, ...);

// TRANSFORM
t_transform *createTransform();
t_matrix *applyPoint(t_transform *transform, t_matrix *vector, int type);
t_matrix *applyVector(t_transform *transform, t_matrix *vector, int type);

#endif