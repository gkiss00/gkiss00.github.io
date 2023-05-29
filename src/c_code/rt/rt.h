#ifndef RT_H
#define RT_H

#include <string.h>
#include <stdlib.h>
#include <stdio.h>
#include <math.h>
#include <stdarg.h>
#include <stdbool.h>
#include <emscripten/emscripten.h>

#define RADIAN(n) ((n) * (2.0 * M_PI / 360))
#define DEGREE(n) (n * (360.0 / (2.0 * M_PI)))

#define EPSILON 0.000001

#define SPHERE 1

#define TO_LOCAL 1
#define TO_REAL 2

typedef struct s_solution {
    int nb;
    double s[2];
}   t_solution;

typedef struct s_color {
    double r;
    double g;
    double b;
    double a;
}   t_color;

typedef struct s_matrix {
    int col;
    int row;
    double tab[4][4];
}   t_matrix;

typedef struct s_transform {
    t_matrix toLocalMatrix;
    t_matrix toRealMatrix;
    t_matrix realOrigin;
    t_matrix localOrigin;
}   t_transform;

typedef struct s_line {
    t_matrix point;
    t_matrix vector;
}   t_line;

typedef struct s_object {
    int type;
    int values[5];
    t_color color;
    t_transform transform;
}   t_object;

typedef struct s_camera {
    t_matrix pointOfVue;
    t_matrix direction;
    t_matrix up;
    double angle;
    int height;
    int width;
    t_matrix U;
    t_matrix V;
    t_matrix screenCenter;
}   t_camera;

typedef struct s_config {
    int width;
    int height;
    int antiAliasing;
    t_camera camera;
    int nbObj;
    t_object *objects;
}   t_config;

typedef struct s_intersection {
    t_matrix pointOfIntersection;
    t_matrix normal;
    t_color *color;
    double distanceFromCamera;
    double reflectionRatio;
    t_object *object;
}   t_intersection;

typedef struct s_listIntersection {
    int nb;
    t_intersection intersections[2];
}   t_listIntersection;

// UTILS
int min(int a, int b);
int max(int a, int b);
t_solution solve(double a, double b, double c);
t_solution createSolution(int nb);
void printMatrix(t_matrix *matrix);
char *substr(char *str, int start, int end);
char *trim(char *str);

// INTERSECTION
t_intersection createIntersection(t_matrix *realIntersection, t_matrix *normal, t_color *color, double dist, double reflectionRatio, t_object *obj);
t_listIntersection createListIntersection();
void addIntersectionToList(t_listIntersection *list, t_intersection *inter);

// COLOR
t_color createColor();
t_color createColorRGB(double r, double g, double b);
t_color createColorRGBA(double r, double g, double b, double a);
t_color createColorCpy(t_color *c);
void addColor(t_color * color1, t_color *color2);
void divideColor(t_color *color, double d);
int colorToInt(t_color *color);
t_color alphaBlending(t_color *color1, t_color *color2);
t_color colorReflection(t_color *color1, t_color *color2, double factor);

// LINE
t_line createLine();
t_line createLineFromPointAndVector(t_matrix *point, t_matrix *vector);
t_line createLineFromTwoPoints(t_matrix *p1, t_matrix *p2);

// MATRIX
t_matrix createPoint();
t_matrix createPointCpy(t_matrix *point);
t_matrix createVector();
t_matrix createVectorCpy(t_matrix *m);
t_matrix createMatrix(int col, int row);
t_matrix createMatrixCpy(t_matrix *m);
void setValueToMatrix(t_matrix *matrix, int col, int row, double value);
double getDeterminant(t_matrix *matrix);
t_matrix getSubMatrixRowed(int n, t_matrix *m);
void unit(t_matrix *matrix);
void transpose(t_matrix *m);
void copyMatrix(t_matrix *from, t_matrix *to);
void adjugate(t_matrix *m);
t_matrix getSubMatrix(t_matrix *m, int c, int r);
void inverse(t_matrix *m);
t_matrix add(t_matrix *matrix1, t_matrix *matrix2);
t_matrix mult(t_matrix *matrix1, t_matrix *matrix2);
t_matrix multMany(int nb, ...);

// point
void addPoint(t_matrix *p1, t_matrix *p2);
double distBetween(t_matrix *p1, t_matrix *p2);

// vector
void times(t_matrix *v, double d);
double magnitude(t_matrix *matrix);
void normalize(t_matrix *matrix);
double scalarProduct(t_matrix *v1, t_matrix * v2);
double dotProduct(t_matrix *v1, t_matrix * v2);
t_matrix crossProduct(t_matrix *v1, t_matrix * v2);
double angleBetween(t_matrix *v1, t_matrix * v2);

// TRANSFORM
t_transform createTransform();
void updateMatrices(
    t_transform *transform,
    double alpha,
    double beta,
    double gama,
    double scalingX,
    double scalingY,
    double scalingZ,
    double translationX,
    double translationY,
    double translationZ
);
t_matrix applyPoint(t_transform *transform, t_matrix *vector, int type);
t_matrix applyVector(t_transform *transform, t_matrix *vector, int type);
t_line applyLine(t_transform *transform, t_line *line, int type);

// CAMERA
t_camera createCamera(t_matrix *pointOfVue, t_matrix *direction, t_matrix *up, double angle);
void updateCamera(t_camera *camera, int height, int width);
t_matrix getPointFromInt(t_camera * cam, int h, int w);
t_matrix getPointFromDouble(t_camera * cam, double h, double w);

// OBJECTS
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
);

// sphere
t_object createSphere(double radius);
void hitSphere(t_object *sphere, t_line *ray, t_listIntersection *list);


#endif