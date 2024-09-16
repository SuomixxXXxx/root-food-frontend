import {TextField} from "../components/TextField.jsx";

export default function RegistrationPage() {
    return (
        <div className="flex items-center h-screen justify-center font-semibold " style={{ borderRadius: '30px'}}>

            <div className=" flex flex-col space-y-4  border-[#475569] items-center "style={{ borderRadius: '30px', boxShadow: "2px 2px 10px grey",border:"#475569"}}>
                <p className={"m-2"} style={{fontSize: '25px'}}>Регистрация</p>
                <TextField placeholder={"Имя"}/>
                <TextField placeholder={"Фамилия"}/>
                <TextField placeholder={"Почта"}/>
                <TextField placeholder={"Пароль"}/>
                <div>
                    <button style={{color: 'white', background: "#14B8A6", fontSize: '15px', borderRadius: '10px', border: '1rem solid #14B8A6' }} className={"m-4"}>Зарегистрироваться</button>

                </div>
                <div className="flex flex-row " style={{marginBottom:"2em"}}>
                    <p style={{color: 'grey',marginRight:"0.5em"}}>Есть аккаунт? </p>
                    <button> Войти</button>
                </div>
            </div>
        </div>
    )

}