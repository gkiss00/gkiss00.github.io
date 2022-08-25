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
					emcc --no-entry ${SRCS} -o rt.mjs  \
					-s ENVIRONMENT='web'  \
					-s SINGLE_FILE=1  \
					-s EXPORT_NAME='createModule'  \
					-s USE_ES6_IMPORT_META=0  \
					-s EXPORTED_RUNTIME_METHODS="['UTF8ToString', 'getValue', 'setValue']" \
					-s ASSERTIONS \
					-s ALLOW_MEMORY_GROWTH \
					-O3