import "./form-input.styles.scss";

// interface Props {
//   label: string;
//   value: string;
//   type: "text" | "email" | "password" | "number";
//   changeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
//   name: string;
// }

type Props = {label: string} & {[key:string]:any};

const FormInput = ({label, ...inputOptions}: Props) => {  
  //console.log(inputOptions);
  return (
    <div className="group">
      <input className="form-input" {...inputOptions} /> 
      { label && 
        <label className={`form-input-label ${inputOptions?.value?.length > 0 ? 'shrink': ''}`}>{label}</label> }
    </div>
  )
}

export default FormInput;
