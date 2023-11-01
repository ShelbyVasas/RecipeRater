import { getAll, getByRecipeId, saveNew, updateSingle, deleteSingle, recipes } from '../controllers/recipesController.js'
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json' assert {type: 'json'};
import express from 'express';
import passport from 'passport';
import session from 'express-session';
import { Strategy as OAuth2Strategy } from 'passport-oauth2';

const app = express()

let userToken: string;

app.use(session({
	secret: process.env.WEB_CLIENT_SECRET,
	resave: false,
	saveUninitialized: true,
	cookie: { secure: false }
}));

passport.use(new OAuth2Strategy({
	authorizationURL: process.env.WEB_AUTH_URI!,
	tokenURL: process.env.WEB_TOKEN_URI!,
	clientID: process.env.WEB_CLIENT_ID!,
	clientSecret: process.env.WEB_CLIENT_SECRET!,
	callbackURL: process.env.WEB_REDIRECT_URI!,
	scope: ['email', 'profile']
},
(token, email, refreshToken, profile, cb) => {
	return cb(null, {token, profile, email, refreshToken });
}));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(express.json())
app.use(passport.initialize())
app.use(passport.session())

passport.serializeUser((user, done) => {
	console.log(user);
	userToken = user.token;
	done(null, user.token);
}) 

passport.deserializeUser((token, done) => {
	done(null, token);
})

app.get('/auth', passport.authenticate('oauth2'));
app.get('/auth/callback', passport.authenticate('oauth2', { failureRedirect: '/auth'}), (req, res) => {
	res.json({status:200, token: userToken})
});

app.get("/", (req, res) => {
	res.send("Recipe Ranker");
  });
app.get("/recipes",  async (req,res) => recipes(req,res))
app.post("/recipes", saveNew);
app.put("/recipes/", updateSingle);
app.delete("/recipes/", deleteSingle);

// Server setup
app.listen(3000, () => {
	console.log("Server is Running")
})