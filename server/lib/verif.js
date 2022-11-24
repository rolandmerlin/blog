
function VMail(e){ return /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/.test(e) }
function VPseudo(e){ return /^[A-Za-z]([A-Za-z0-9]{1,15})$/.test(e) }
function VPassword(e){ return /^[A-Za-z0-9]{1,32}$/.test(e) }

function DataFill(o){
    return Object.keys(o).filter((ko) => o[ko]).map((ko) => ( { [ko]:o[ko] } ))
}

//export default { VMail, VPseudo, VPassword, DataFill }

module.exports = { VMail, VPseudo, VPassword, DataFill }