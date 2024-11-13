export class ScriptsUtils {

    static createScript(scriptId = '', scriptAsync = false, scriptSrc = '') {
        // Создание элемента script для подключения к DC
        const dcScript = document.createElement('script')
        if (scriptAsync) {dcScript.setAttribute('async', scriptAsync)}
        // dcScript.async = scriptAsync
        dcScript.src = scriptSrc
        dcScript.id = scriptId  // идентификатор скрипта подключения к DC
        document.body.appendChild(dcScript)    
    }
}