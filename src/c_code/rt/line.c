#include "rt.h"

t_line createLine() {
    t_line line;
    line.point = createPoint();
    line.vector = createVector();
    return line;
}

t_line createLineFromPointAndVector(t_matrix *point, t_matrix *vector) {
    t_line line;
    line.point = createPointCpy(point);
    line.vector = createVectorCpy(vector);
    return line;
}

t_line createLineFromTwoPoints(t_matrix *p1, t_matrix *p2) {
    t_line line;
    line.point = createPointCpy(p1);
    line.point.tab[0][3] = 1;
    line.vector = createVector();
    line.vector.tab[0][0] = p2->tab[0][0] - p1->tab[0][0];
    line.vector.tab[0][1] = p2->tab[0][1] - p1->tab[0][1];
    line.vector.tab[0][2] = p2->tab[0][2] - p1->tab[0][2];
    line.vector.tab[0][3] = 1;
    return line;
}