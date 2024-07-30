const LoginPage = () => {
    const [emailOrPhone, setEmailOrPhone] = useState('');
    const [password, setPassword] = useState('');
    const [loginMessage, setLoginMessage] = useState('');
    const [isError, setIsError] = useState(false);
  
    const handleLogin = async (e) => {
      e.preventDefault();
  
      // Replace with your actual login API URL
      const loginUrl = `${process.env.REACT_APP_API_BASE_URL}/users/login`;
  
      try {
        const response = await fetch(loginUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ emailOrPhone, password }),
        });
  
        if (response.ok) {
          // Handle successful login
          setLoginMessage('Login successful!');
          setIsError(false);
          // Redirect user or update the UI
        } else {
          // Handle login failure
          setLoginMessage('Login failed. Please check your credentials.');
          setIsError(true);
        }
      } catch (error) {
        setLoginMessage('An error occurred. Please try again later.');
        setIsError(true);
      }
    };
  
    return (
      <div className="container">
        <div className="Image">
          <img className='img' src={SignupImage} alt="" />
        </div>
  
        <div className="Form">
          <div className="already-have-an-account">
            <span className='back_home'>
              <IoIosArrowBack />
              <p>Back home</p>
            </span>
          </div>
  
          <div className="form_body">
            <div className='create-account'>
              <div className='form_container'>
                <h1 className='form_hader'>Welcome back!</h1>
                <form onSubmit={handleLogin}>
                  <p className='personal-information'>Welcome back! Please enter your details</p>
  
                  <div className="user-Name">
                    <span>
                      <p className='name'>Email address / Phone number</p>
                      <input
                        className='input-field email'
                        type="text"
                        placeholder='Enter Email or Phone number'
                        value={emailOrPhone}
                        onChange={(e) => setEmailOrPhone(e.target.value)}
                        required
                      />
                    </span>
                  </div>
  
                  <div className="">
                    <p className='name'>Password</p>
                    <span className='password-finger'>
                      <input
                        className='input-field email'
                        type="password"
                        placeholder='Enter Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      <div className='fingerprint'>
                        <span>
                          <MdOutlineFingerprint />
                        </span>
                      </div>
                    </span>
                  </div>
  
                  <span className='remember'>
                    <span className='check-rember'>
                      <input type="checkbox" />
                      <p>Remember me for 30 days</p>
                    </span>
                    <p className='forgot'>Forgot password</p>
                  </span>
  
                  <div className="continue-back-btn bank">
                    <button className='continue' type="submit">
                      Login
                    </button>
                  </div>
  
                  {loginMessage && (
                    <p className={`login-message ${isError ? 'error' : 'success'}`}>
                      {loginMessage}
                    </p>
                  )}
  
                  <span className='no-account'>
                    Don't have an account?
                    <p className='forgot'>Sign up</p>
                  </span>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  