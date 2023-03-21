import TopNavBar from "../components/TopNavBar"


function Contact() {
    return (
        <>
            <TopNavBar />
            <section className="contact-page">
                <div className="container">
                    <div className="contact-div">
                        <div className="contact-div__text">
                            <h2>Envíanos un mensaje</h2>
                            <p>
                            Estamos complacidos en responder cualquier pregunta que puedas tener. Envíanos un mensaje y tan pronto lo recibamos, te estaremos respondiendo.
                            </p>
                            <a href="/">
                                <i className="fa-solid fa-phone"></i> whatsapp: +57 300 456 7869
                            </a>
                            <a href="/">
                                <i className="fa-solid fa-envelope"></i>
                                email: united@mail.com
                            </a>

                        </div>
                        <div className="contact-div__form">
                            <form>
                                <label>
                                    Nombre <b>*</b>
                                </label>
                                <input type="text" placeholder='E.j: "Juan Camilo"'></input>

                                <label>
                                    Email <b>*</b>
                                </label>
                                <input type="email" placeholder="email@example.com"></input>

                                <label>
                                    Mensaje <b>*</b>
                                </label>
                                <textarea placeholder="Escribe aqui.."></textarea>

                                <button type="submit">
                                    <i className="fa-solid fa-envelope-open-text"></i>&nbsp; Enviar mensaje
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

            </section>
        </>
    );
}

export default Contact;