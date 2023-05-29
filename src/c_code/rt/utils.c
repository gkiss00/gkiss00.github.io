#include "rt.h"

int min(int a, int b) {
    return a > b ? b : a;
}

int max(int a, int b) {
    return a < b ? b : a;
}


t_solution createSolution(int nb) {
    t_solution solution;
    solution.nb = nb;
    return solution;
}

t_solution solve(double a, double b, double c) {
    t_solution solution;

    if(a < EPSILON && a > -EPSILON) {
        solution = createSolution(1);
        solution.s[0] = -c / b;
    }
    double delta = b * b - 4 * a * c;
    if (delta < 0) {
        solution = createSolution(0);
    } else if (delta == 0) {
        solution = createSolution(1);
        solution.s[0] = -b / (2 * a);
    } else {
        solution = createSolution(2);
        solution.s[0] = (-b + sqrt(delta)) / (2 * a);
        solution.s[1] = (-b - sqrt(delta)) / (2 * a);
    }
    return solution;
}

void printMatrix(t_matrix *matrix) {
    for (int i = 0; i < 4; ++i) {
        for(int j = 0; j < 4; ++j) {
            printf("%f ", matrix->tab[j][i]);
        }
        printf("\n");
    }
}

char *substr(char *str, int start, int end) {
    int i = 0;
    char *sub = malloc(end - start + 1);

    while(start < end) {
        sub[i] = str[start];
        ++i;
        ++start;
    }
    sub[start] = '\0';
    return sub;
}

char *trim(char *str) {
    int i = 0;
    int size = 0;
    char *result;

    while(str[i] != ' ' && str[i] != '\0') {
        ++size;
        ++i;
    }
    result = malloc(size + 1);
    i = 0;
    while(i < size) {
        result[i] = str[i];
        ++i;
    }
    result[i] = '\0';
    return result;
}

EMSCRIPTEN_KEEPALIVE
char *createBuffer(int n) {
    return malloc(n);
}