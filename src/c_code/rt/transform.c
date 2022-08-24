#include "rt.h"

t_transform createTransform() {
    t_transform transform;
    transform.toLocalMatrix = createMatrix(4, 4);
    transform.toRealMatrix = createMatrix(4, 4);
    transform.localOrigin = createPoint();
    transform.realOrigin = createPoint();
    return transform;
}

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
) {
    t_matrix translationMatrix = createMatrix(4, 4);
    unit(&translationMatrix);
    setValueToMatrix(&translationMatrix, 3, 0, translationX);
    setValueToMatrix(&translationMatrix, 3, 1, translationY);
    setValueToMatrix(&translationMatrix, 3, 2, translationZ);

    t_matrix scalingMatrix = createMatrix(4, 4);
    unit(&scalingMatrix);
    setValueToMatrix(&scalingMatrix, 0, 0, scalingX);
    setValueToMatrix(&scalingMatrix, 1, 1, scalingY);
    setValueToMatrix(&scalingMatrix, 2, 2, scalingZ);

    t_matrix rotateXMatrix = createMatrix(4, 4);
    unit(&rotateXMatrix);
    setValueToMatrix(&rotateXMatrix, 1, 1, cos(RADIAN(alpha)));
    setValueToMatrix(&rotateXMatrix, 2, 1, -sin(RADIAN(alpha)));
    setValueToMatrix(&rotateXMatrix, 1, 2, sin(RADIAN(alpha)));
    setValueToMatrix(&rotateXMatrix, 2, 2, cos(RADIAN(alpha)));

    t_matrix rotateYMatrix = createMatrix(4, 4);
    unit(&rotateYMatrix);
    setValueToMatrix(&rotateYMatrix, 0, 0, cos(RADIAN(beta)));
    setValueToMatrix(&rotateYMatrix, 2, 0, sin(RADIAN(beta)));
    setValueToMatrix(&rotateYMatrix, 0, 2, -sin(RADIAN(beta)));
    setValueToMatrix(&rotateYMatrix, 2, 2, cos(RADIAN(beta)));

    t_matrix rotateZMatrix = createMatrix(4, 4);
    unit(&rotateZMatrix);
    setValueToMatrix(&rotateZMatrix, 0, 0, cos(RADIAN(gama)));
    setValueToMatrix(&rotateZMatrix, 1, 0, -sin(RADIAN(gama)));
    setValueToMatrix(&rotateZMatrix, 0, 1, sin(RADIAN(gama)));
    setValueToMatrix(&rotateZMatrix, 1, 1, cos(RADIAN(gama)));

    transform->toRealMatrix = multMany(5, &translationMatrix, &scalingMatrix, &rotateZMatrix, &rotateYMatrix, &rotateXMatrix);
    transform->toLocalMatrix = createMatrixCpy(&(transform->toRealMatrix));
    inverse(&(transform->toLocalMatrix));

    transform->realOrigin = applyPoint(transform, &(transform->realOrigin), TO_REAL);
    transform->localOrigin = applyPoint(transform, &(transform->localOrigin), TO_LOCAL);
}

t_matrix applyPoint(t_transform *transform, t_matrix *point, int type) {
    t_matrix pointResultMatrix;
    if(type == TO_LOCAL) {
        pointResultMatrix = mult(&(transform->toLocalMatrix), point);
    } else {
        pointResultMatrix = mult(&(transform->toRealMatrix), point);
    }
    pointResultMatrix.tab[0][3] = 1;
    return pointResultMatrix;
}

t_matrix applyVector(t_transform *transform, t_matrix *vector, int type) {
    t_matrix vectorResultMatrix;
    if(type == TO_LOCAL) {
        vectorResultMatrix = mult(&(transform->toLocalMatrix), vector);
        vectorResultMatrix.tab[0][0] = vectorResultMatrix.tab[0][0] - transform->localOrigin.tab[0][0];
        vectorResultMatrix.tab[0][1] = vectorResultMatrix.tab[0][1] - transform->localOrigin.tab[0][1];
        vectorResultMatrix.tab[0][2] = vectorResultMatrix.tab[0][2] - transform->localOrigin.tab[0][2];
    } else {
        vectorResultMatrix = mult(&(transform->toRealMatrix), vector);
        vectorResultMatrix.tab[0][0] = vectorResultMatrix.tab[0][0] - transform->realOrigin.tab[0][0];
        vectorResultMatrix.tab[0][1] = vectorResultMatrix.tab[0][1] - transform->realOrigin.tab[0][1];
        vectorResultMatrix.tab[0][2] = vectorResultMatrix.tab[0][2] - transform->realOrigin.tab[0][2];
    }
    vectorResultMatrix.tab[0][3] = 1;
    return vectorResultMatrix;
}

t_line applyLine(t_transform *transform, t_line *line, int type) {
    t_matrix point = applyPoint(transform, &(line->point), type);
    t_matrix vector = applyVector(transform, &(line->vector), type);
    return createLineFromPointAndVector(&point, &vector);
}