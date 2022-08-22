#include "rt.h"

t_matrix *createPoint() {
    t_matrix *matrix = malloc(sizeof(t_matrix));
    matrix->col = 1;
    matrix->row = 4;
    matrix->tab = malloc(matrix->row * sizeof(double*));
    for(int i = 0;i < matrix->row; ++i) {
        matrix->tab[i] = malloc(matrix->col * sizeof(double));
    }
    matrix->tab[0][0] = 0;
    matrix->tab[0][1] = 0;
    matrix->tab[0][2] = 0;
    matrix->tab[0][3] = 1;
    return matrix;
}

t_matrix *createVector() {
    t_matrix *matrix = malloc(sizeof(t_matrix));
    matrix->col = 1;
    matrix->row = 4;
    matrix->tab = malloc(matrix->row * sizeof(double*));
    for(int i = 0;i < matrix->row; ++i) {
        matrix->tab[i] = malloc(matrix->col * sizeof(double));
    }
    matrix->tab[0][0] = 1;
    matrix->tab[0][1] = 1;
    matrix->tab[0][2] = 1;
    matrix->tab[0][3] = 1;
    return matrix;
}

t_matrix *createMatrix(int col, int row) {
    t_matrix *matrix = malloc(sizeof(t_matrix));
    matrix->col = col;
    matrix->row = row;
    matrix->tab = malloc(row * sizeof(double*));
    for(int i = 0;i < row; ++i) {
        matrix->tab[i] = malloc(col * sizeof(double));
    }
    for (int i = 0; i < matrix->col; ++i) {
        for (int j = 0; j < matrix->row; ++j) {
            matrix->tab[i][j] = 0;
        }
    }
    return matrix;
}

t_matrix *createMatrixCpy(t_matrix *m) {
    t_matrix *matrix = malloc(sizeof(t_matrix));
    matrix->col = m->col;
    matrix->row = m->row;
    matrix->tab = malloc(m->row * sizeof(double*));
    for(int i = 0;i < m->row; ++i) {
        matrix->tab[i] = malloc(m->col * sizeof(double));
    }
    for (int i = 0; i < m->col; ++i) {
        for (int j = 0; j < m->row; ++j) {
            matrix->tab[i][j] = m->tab[i][j];
        }
    }
    return matrix;
}

void setValueToMatrix(t_matrix *matrix, int col, int row, double value) {
    matrix->tab[col][row] = value;
}

double getDeterminant(t_matrix *matrix) {
    int n = matrix->col;
    if(n == 0)
        return 0;
    else if (n == 1)
        return matrix->tab[0][0];
    else if (n == 2) {
        return (matrix->tab[0][0] * matrix->tab[1][1]) - (matrix->tab[0][1] * matrix->tab[1][0]);
    } else {
        double determinant = 0;
        for (int i = 0; i < n; ++ i) {
            double sign = (i % 2 == 0 ? (1) : (-1));
            t_matrix *subMatrix = getSubMatrixRowed(i, matrix);
            determinant += sign * getDeterminant(subMatrix) * matrix->tab[0][i];
        }
        return determinant;
    }
}

t_matrix *getSubMatrixRowed(int n, t_matrix *m) {
    t_matrix *matrix = createMatrix(m->col - 1, m->row -1);

    for (int i = 1; i < m->col; ++i) {
        for (int j = 0; j < m->row; ++j) {
            if (j < n)
                matrix->tab[i - 1][j] = m->tab[i][j];
            else if (j == n) {

            } else {
                matrix->tab[i - 1][j - 1] = m->tab[i][j];
            }
        }
    }
    return matrix;
}

void unit(t_matrix *matrix) {
    for (int i = 0; i < matrix->col; ++i) {
        for (int j = 0; j < matrix->col; ++j) {
            matrix->tab[i][j] = i == j ? (1) : (0);
        }
    }
}

void transpose(t_matrix *m) {
    t_matrix *matrix = createMatrix(m->row, m->col);

    for (int i = 0; i < m->col; ++i) {
        for (int j = 0; j < m->row; ++j) {
            matrix->tab[j][i] = m->tab[i][j];
        }
    }
    copyMatrix(matrix, m);
}

void copyMatrix(t_matrix *from, t_matrix *to) {
    to->col = from->col;
    to->row = from->row;
    to->tab = malloc(from->row * sizeof(double*));
    for(int i = 0;i < from->row; ++i) {
        to->tab[i] = malloc(from->col * sizeof(double));
    }
    for (int i = 0; i < from->col; ++i) {
        for (int j = 0; j < from->row; ++j) {
            to->tab[i][j] = from->tab[i][j];
        }
    }
}

void adjugate(t_matrix *m) {
    t_matrix *matrix = createMatrix(m->col, m->row);
    for (int i = 0; i < m->col; ++i) {
        for (int j = 0; j < m->row; ++j) {
            double sign = (i + j) % 2 == 0 ? (1) : (-1);
            t_matrix *subMatrix = getSubMatrix(m, i, j);
            matrix->tab[i][j] = sign * getDeterminant(subMatrix);
        }
    }
    transpose(matrix);
    copyMatrix(matrix, m);
}

t_matrix *getSubMatrix(t_matrix *m, int c, int r) {
    t_matrix *matrix = createMatrix(m->col - 1, m->row - 1);

    int c_offset;
    int r_offset;
    for (int i = 0; i < m->col; ++i) {
        for (int j = 0; j < m->row; ++j) {
            c_offset = i < c ? (0) : (-1);
            r_offset = j < r ? (0) : (-1);
            if (i != c && j != r)
                matrix->tab[i + c_offset][j + r_offset] = m->tab[i][j];
        }
    }
    return matrix;
}

void inverse(t_matrix *m) {
    double determinant = getDeterminant(m);

    t_matrix *m1 = createMatrixCpy(m);
    adjugate(m1);
    for (int i = 0; i < m->col; ++i) {
        for (int j = 0; j < m->row; ++j) {
            m->tab[i][j] = (1.0 / determinant) * m1->tab[i][j];
        }
    }
}

t_matrix *add(t_matrix *matrix1, t_matrix *matrix2) {
    t_matrix *m = createMatrix(matrix1->col, matrix1->row);
    for (int i = 0; i < matrix1->col; ++i) {
        for (int j = 0; j < matrix1->row; ++i) {
            m->tab[i][j] = matrix1->tab[i][j] + matrix2->tab[i][j];
        }
    }
    return m;
}

t_matrix *mult(t_matrix *matrix1, t_matrix *matrix2) {
    int cols = matrix2->col;
    int rows = matrix1->row;
    t_matrix *result = createMatrix(cols, rows);
    for (int i = 0; i < result->col; ++i) {
        for (int j = 0; j < result->row; ++j) {
            for (int x = 0; x < matrix1->col; ++x) {
                result->tab[i][j] += matrix1->tab[x][j] * matrix2->tab[i][x];
            }
        }
    }
    return result;
}

t_matrix *multMany(int nb, ...) {
    t_matrix *first;
    t_matrix *tmp;
    t_matrix *result;

    va_list ap;
    va_start(ap, nb);
    for (int i = 0; i < nb; ++i) {
        tmp = va_arg(ap, t_matrix*);
        if(i == 0){
            result = createMatrixCpy(tmp);
        } else {
            result = mult(result, tmp);
        }
    }
    va_end(ap);
    return result;
}