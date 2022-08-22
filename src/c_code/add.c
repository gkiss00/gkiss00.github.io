#include <string.h>
#include <stdlib.h>
#include <stdio.h>
#include <emscripten/emscripten.h>

typedef struct test {
    int a;
    int b;
} test;

EMSCRIPTEN_KEEPALIVE
int add(int a, int b) {
    return a + b;
}

EMSCRIPTEN_KEEPALIVE
int sub(int a, int b) {
    return a - b;
}

EMSCRIPTEN_KEEPALIVE
char *ft_memory(unsigned int size) {
    return calloc(size + 1, 1);
}

EMSCRIPTEN_KEEPALIVE
char *ft_str() {
    char *str= calloc(5 + 1, 1);
    memcpy(str, "hello", 5);
    return str;
}

EMSCRIPTEN_KEEPALIVE
int ft_strlen(char *str) {
    return strlen(str);
}

// STRUCT
EMSCRIPTEN_KEEPALIVE
struct test *create_struct() {
    struct test *tmp = malloc(sizeof(struct test));
    return tmp;
}

EMSCRIPTEN_KEEPALIVE
void set_struct(int addr, int a, int b) {
    void *x = (void*)addr;
    struct test *t = x;
    t->a = a;
    t->b = b;
}

EMSCRIPTEN_KEEPALIVE
int calc_struct(int addr) {
    void *x = (void*)addr;
    struct test *tmp = x;
    return tmp->a + tmp->b;
}

typedef struct _WA_STRUCT {
 int a;
 double b;
}WA_STRUCT;

void EMSCRIPTEN_KEEPALIVE structCreate(struct _WA_STRUCT **ppStruct) {
    struct _WA_STRUCT   *pStruct = malloc(sizeof(struct _WA_STRUCT));
    
    pStruct->a = 35;
    pStruct->b = 3.14;
*ppStruct  = pStruct;
}
void EMSCRIPTEN_KEEPALIVE structDestory(struct _WA_STRUCT *pStruct) {
    free(pStruct);
}
void EMSCRIPTEN_KEEPALIVE structPrint(struct _WA_STRUCT *pStruct) {
    printf("Struct Values {%d, %.3f}\n", pStruct->a, pStruct->b);
}
void EMSCRIPTEN_KEEPALIVE structQuery(struct _WA_STRUCT *pStruct, int *pa, double *pb) {
    *pa = pStruct->a;
    *pb = pStruct->b;
}
void EMSCRIPTEN_KEEPALIVE structSet(struct _WA_STRUCT *pStruct, int a, double b) {
    pStruct->a = a;
    pStruct->b = b;
}