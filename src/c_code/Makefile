all :
		emcc --no-entry add.c -o add.mjs  \
					-s ENVIRONMENT='web'  \
					-s SINGLE_FILE=1  \
					-s EXPORT_NAME='createModule'  \
					-s USE_ES6_IMPORT_META=0  \
					-s EXPORTED_FUNCTIONS='["_malloc", "_calloc", "_free"]'  \
					-s EXPORTED_RUNTIME_METHODS="['UTF8ToString', 'getValue', 'setValue']" \
					-O3