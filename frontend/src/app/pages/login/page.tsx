import { Form } from "./form";
import { ImageComponent } from "./image_component";

export default function Login(){
    return (
        <main className="flex flex-col lg:flex-row justify-center items-center">
            <ImageComponent/>
            <Form/>
        </main>
    )
}