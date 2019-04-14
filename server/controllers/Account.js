const models = require('../models');

const Account = models.Account;


//RENDER ALL THE PAGES
const loginPage = (req, res) => {
  res.render('login', { csrfToken: req.csrfToken() });
};

const notFound = (req, res) => {
  res.render('notfound', { csrfToken: req.csrfToken() });
}

const changePage = (req, res) => {
  res.render('changepass', { csrfToken: req.csrfToken() });
};

const aboutPage = (req, res) => {
  res.render('about', { csrfToken: req.csrfToken() });
};

const signupPage = (req, res) => {
  res.render('signup', { csrfToken: req.csrfToken() });
};


//LOGOUT BUTTON
const logout = (req, res) => {
  req.session.destroy();
  res.redirect('/');
};

//HANDLE LOGIN
const login = (request, response) => {
  const req = request;
  const res = response;

    // force cast to strings to cover some security flaws
  const username = `${req.body.username}`;
  const password = `${req.body.pass}`;

  if (!username || !password) {
    return res.status(400).json({ error: 'RAWR! All the fields are required' });
  }

  return Account.AccountModel.authenticate(username, password, (err, account) => {
    if (err || !account) {
      return res.status(401).json({ error: 'Wrong username or password' });
    }

    req.session.account = Account.AccountModel.toAPI(account);

    return res.json({ redirect: '/maker' });
  });
};


//HANDLE SIGNUP
const signup = (request, response) => {
  const req = request;
  const res = response;

    // cast to strings to cover up some security flaws
  req.body.username = `${req.body.username}`;
  req.body.pass = `${req.body.pass}`;
  req.body.pass2 = `${req.body.pass2}`;


  if (req.body.pass !== req.body.pass2) {
    return res.status(400).json({ error: 'Passwords do not match' });
  }

  return Account.AccountModel.generateHash(req.body.pass, (salt, hash) => {
    const accountData = {
      username: req.body.username,
      salt,
      password: hash,
    };
    const newAccount = new Account.AccountModel(accountData);
    const savePromise = newAccount.save();

    savePromise.then(() => {
      req.session.account = Account.AccountModel.toAPI(newAccount);
      res.json({ redirect: '/maker' });
    });

    savePromise.catch((err) => {
      console.log(err);

      if (err.code === 11000) {
        return res.status(400).json({ error: 'Username already in use' });
      }

      return res.status(400).json({ error: 'An error occurred' });
    });
  });
};


// CHANGE USER PASSWORD
const changePass = (request, response) => {
  const req = request;
  const res = response;

  req.body.pass = `${req.body.pass}`;
  req.body.pass2 = `${req.body.pass2}`;


  if (req.body.pass !== req.body.pass2) {
    return res.status(400).json({ error: 'Passwords do not match!' });
  }

  return Account.AccountModel.findByUsername(req.session.account.username, (err, doc) => {
    if (err) {
      return res.json({ err });
    }

    const account = doc;

    return Account.AccountModel.generateHash(req.body.pass, (salt, hash) => {
      account.password = hash;
      account.salt = salt;
      const savePromise = account.save();


      savePromise.then(() => {
        res.json({ redirect: '/maker' });
      });

      savePromise.catch(() => {
        res.json({ err });
      });


      return res;
    });
  });
};

module.exports.loginPage = loginPage;
module.exports.changePage = changePage;
module.exports.changePass = changePass;
module.exports.login = login;
module.exports.logout = logout;
module.exports.signupPage = signupPage;
module.exports.signup = signup;
module.exports.aboutPage = aboutPage;
module.exports.notFound = notFound;