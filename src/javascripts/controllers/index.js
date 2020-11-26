export const indexPage = (req, res, next) => {
  res.render('layout', {content: 'index', title: 'My Courses'})
}

export const aboutPage = (req, res, next) => {
  res.render('layout', {content: 'about', title: 'About This Assignment'})
}

export const contactPage = (req, res, next) => {
  res.render('layout', {content: 'contact', title: 'Contact'})
}

export const signInPage = (req, res, next) => {
  res.render('layout', {content: 'signin', title: 'Sign In'})
}

export const signUpPage = (req, res, next) => {
  res.render('layout', {content: 'signup', title: 'Sign Up'})
}