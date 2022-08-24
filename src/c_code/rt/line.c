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