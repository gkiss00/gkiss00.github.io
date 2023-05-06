SRCS				= 	rt.c \
						matrix.c \
						transform.c \
						line.c \
						intersection.c \
						color.c \
						utils.c \
						camera.c \
						obj/sphere.c \
						
all :				
					emcc --no-entry ${SRCS} -o t.mjs  \
					-s ENVIRONMENT='web'  \
					-s SINGLE_FILE=1  \
					-s EXPORT_NAME='createModule'  \
					-s USE_ES6_IMPORT_META=0  \
					-s EXPORTED_FUNCTIONS='["_rt", "_malloc", "_free"]'  \
					-s EXPORTED_RUNTIME_METHODS='["ccall", "cwrap"]'  \
					-s EXTRA_EXPORTED_RUNTIME_METHODS=['UTF8ToString'] \
					-O3