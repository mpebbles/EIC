rm -rf eic/react-backend/public/ && cd eic/client/ && npm run build && mkdir ../react-backend/public/ && cp -r build/* ../react-backend/public/ && cd ../react-backend/ && npm start
