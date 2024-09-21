import {TextField} from "../components/TextField.jsx";
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
  } from "@material-tailwind/react";
   

export default function RegistrationPage() {
    return (
        <div className="h-screen bg-blue-gray-100 flex justify-center items-center ">
            <Card  className="flex items-center flex-col   border-[#475569] w-80  ">
                <Typography className="text-4xl text-blue-600/75 mt-4" >
                    Аквариум
                    </Typography>
                {/* <CardHeader  floated={false} shadow={false} className="  flex h-10 w-80 justify-center items-center " >
                    
                    
                </CardHeader> */}
                <CardBody className="flex flex-col ">
                    <TextField placeholder={"Имя"}/>
                    <TextField placeholder={"Номер телефона"}/>
                    <TextField placeholder={"Почта"}/>
                    <TextField placeholder={"Пароль"}/>
                </CardBody>

                <CardFooter className="pt-0 w-80" >
                    <Button  className="w-full" color="blue">
                        Зарегистрироваться
                    </Button>
                    <Typography variant="small" className="mt-6 flex justify-center">
                        Есть аккаунт?
                    <Typography as="a" href="#войти" variant="small" color="blue-gray" className="ml-1 font-bold">
                        Войти
                    </Typography>
                    </Typography>
                </CardFooter>
            </Card>
        </div>
            
    )

}