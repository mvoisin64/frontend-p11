import SignForm from "../../Components/SignForm/SignForm";
const Signin = () => {
    return (
        <main className="main">
            <div className="sign-in-content">
                <i className="fa fa-user-circle sign-in-icon"></i>
                <h1>Sign In</h1>
                <SignForm/>
            </div>
        </main>
    );
};

export default Signin;