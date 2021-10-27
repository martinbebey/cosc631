function ContactInfo()
{
    return (
    
        <p style={{color:"red"}}>
            Contact: bcyrille@emich.edu
        </p>
    );
}

function Education()
{
    return (
    
        <div>
            Component 2 - education: PhD
        </div>
    );
}

function Footer()
{
    return (
    
        <div>
            Component 1: I am still getting familiar with react components and rendering of the page
        </div>
    );
}

function Bold()
{
    return (
    
        <b>
            Component 3: My html and css are still a bit rusty :(
        </b>
    );
}

export {Bold}
export {Education};
export {Footer};
export default ContactInfo;