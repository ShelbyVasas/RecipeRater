import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    version: '1.0.0',      // by default: '1.0.0'
    title: 'Contacts API',        // by default: 'REST API'
    description: '',  // by default: ''
  },
  host: 'localhost:3000',      // by default: 'localhost:3000'
  basePath: '/contacts',  // by default: '/'
  schemes: ['http'],   // by default: ['http']
  consumes: [],  // by default: ['application/json']
  produces: [],  // by default: ['application/json']
  tags: [        // by default: empty Array
    {
      name: '',         // Tag name
      description: '',  // Tag description
    },
  ],
  securityDefinitions: {},  // by default: empty object
  definitions: {},          // by default: empty object (Swagger 2.0)
  components: {}            // by default: empty object (OpenAPI 3.x)
};

const outputFile = './src/routes/swagger.json';
const endpointsFiles = ['./src/routes/index.ts'];


swaggerAutogen()(outputFile, endpointsFiles, doc);