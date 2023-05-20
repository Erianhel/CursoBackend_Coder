export const getTest = (req,res) => {
    //req.logger.fatal("Este es un logger de nivel: fatal");
    //req.logger.error("Este es un logger de nivel: error");
    //req.logger.warning("Este es un logger de nivel: warning");
    //req.logger.info("Este es un logger de nivel: info");
    //req.logger.http("Este es un logger de nivel: http");
    //req.logger.debug("Este es un logger de nivel: debug");
    res.send("Testeando logger");
    
}