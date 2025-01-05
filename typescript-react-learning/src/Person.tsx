import { useState } from "react"

interface Person {
    name :string
    age : number 
    isMarried : boolean
}


export const Person = (props : Person) => {


    const [isShowInfo, setShowInfo] = useState<boolean | null | string >(false);
    const toggleInfo = () => {
        setShowInfo((prev) => !prev);
    } 
    const[personBio, setPersonBio] = useState<string | null>(null);
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPersonBio(event.target.value);
    };
    return (
        <div>
            {isShowInfo && (  
            <>
                <p>Name : {props.name}</p>
                <p>Age : {props.age}</p>
                <p>isMarried : {props.isMarried ? "he is married " : "he is single"}</p>
                <p> {props.name} Bio : {!personBio ? "No Bio" : personBio} </p>
            </>          
            )}
            <input onChange={handleChange}/>
            <button onClick={toggleInfo}>CLick me!</button>
        </div>
    );
}