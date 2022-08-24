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
    solution.s = malloc(nb * sizeof(double));
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