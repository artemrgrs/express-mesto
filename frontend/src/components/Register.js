import React from 'react';
import { Link } from 'react-router-dom'; 

function Register({handleRegister}) {
    const [data, setData] = React.useState({
        password: '',
        email: '',
      });

    function handleChange(e) {
    const {name, value} = e.target;
        setData({
            ...data,
            [name]: value
        })
    }

    function handleSubmit(e) {
        e.preventDefault();

        const {email, password} = data;
        handleRegister(email, password);
    }

  return (
        <form className="auth-form" onSubmit={handleSubmit}>
            <h2 className="auth-form__heading">Регистрация</h2>
            <fieldset className="auth-form__fieldset">
                <input className="auth-form__input" id="email" name="email" type="email" value={data.email} required placeholder="Email" onChange={handleChange} />
                <input className="auth-form__input" id="password" name="password" type="password" value={data.password} required placeholder="Пароль" onChange={handleChange} />
            </fieldset>
            <button type="submit" className="auth-form__button">Зарегистрироваться</button>
            <Link to="/sign-in" className="auth-form__link">Уже зарегистрированы? Войти</Link>
        </form>
  );
}

export default Register;  