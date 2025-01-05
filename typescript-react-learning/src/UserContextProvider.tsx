//used to store all the type of the props rather than creating it inside the component
import { createContext, useEffect, useState } from "react";
import { Person } from "./Person";

interface Person {
    name :string
    age : number 
    isMarried : boolean
}

//void is the return type
interface UserContextType {
    users: Person[] | null ;
    addUser : (user: Person) => void;
    updateUser : (id : string) => void;
    deleteUser : (id : string) => void;
}

const initialContext: UserContextType = {
    users : null,
    addUser : () => null,
    updateUser : () => null,
    deleteUser : () => null,
};

export const UserContext = createContext<UserContextType>(initialContext)

interface Props {
    children : React.ReactNode;
}
//destructure rather than keep using the word props.
export const UserProvider = ({children} : Props) => {
    const[users, setUsers] = useState<Person[] | null>(null);

    useEffect(() => {
        setUsers([{name: "pedro" , age: 22, isMarried: false}]);
    }, []);

    const addUser  = (user: Person) => null
    const updateUser =  (id : string) => null
    const deleteUser =  (id : string) => null

    return (<
        UserContext.Provider value = {{users, addUser, updateUser, deleteUser}}>{children}</UserContext.Provider>)
}

