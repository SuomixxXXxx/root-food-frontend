
import TextField from "../components/TextField";
export default function RegistrationPage(){
  return(
    <div className="flex items-center h-screen justify-center ">
      
      <div className=" flex flex-col space-y-4 border-2 border-[#475569] items-center ">
      <p>Регистрация</p>
          <TextField/>
          <TextField/>
          <TextField/>
        </div>
    </div>
  )

}