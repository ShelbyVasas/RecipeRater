export const authControler = (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    // res.redirect('/login');
    res.status(401).json({
      success: false,
      message: 'You are not authorized to view this resource because you are not logged in.'
    });
}