const Button = (label,func,parameter) => {
    return (
        <button onClick={()=>func(parameter)}>{label}</button>
    )

}

export default Button;
