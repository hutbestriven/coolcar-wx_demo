set PBTS_BIN_DIR=E:\CODE\go_code\coolcar\wx\miniprogram\node_modules\.bin
set PBTS_OUT_DIR=E:\CODE\go_code\coolcar\wx\miniprogram\service\proto_gen

%PBTS_BIN_DIR%\pbjs -t static -w es6 trip.proto --no-create --no-encode --no-decode --no-delimited -o %PBTS_OUT_DIR%\trip_pb_tmp.js
echo 'import * as $protobuf from "protobufjs";\n' > %PBTS_OUT_DIR%\trip_pb_tmp.js
cat %PBTS_OUT_DIR%\trip_pb_tmp.js >> %PBTS_OUT_DIR%\trip_pb.js
rm %PBTS_OUT_DIR%\trip_pb_tmp.js

E:\CODE\go_code\coolcar\wx\miniprogram\node_modules\.bin\pbts -o E:\CODE\go_code\coolcar\wx\miniprogram\service\proto_gen\trip_pb.d.ts E:\CODE\go_code\coolcar\wx\miniprogram\service\proto_gen\trip_pb.js


