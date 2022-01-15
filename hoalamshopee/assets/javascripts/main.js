
// Xử lý hành vi khi click vào ô đăng ký / đăng nhập
function registrationLogin() {
    var confirmBtns = document.querySelectorAll('.header__navbar-item--strong')
    var modal = document.querySelector('.modal')
    var authForm1 = modal.querySelector('.auth-form-1')
    var authForm2 = modal.querySelector('.auth-form-2')
    var backBtn = modal.querySelectorAll('.auth-form__controls-back')
    var changeForm = modal.querySelectorAll('.auth-form__switch-btn')
    var overlay = modal.querySelector('.modal__overlay')

    if(confirmBtns) {
        for(var i = 0; i < confirmBtns.length; i++) {
            confirmBtns[0].onclick = function() {
                modal.classList.add('open')
                authForm1.classList.add('open')
            }

            confirmBtns[1].onclick = function() {
                modal.classList.add('open')
                authForm2.classList.add('open')
            }

            for ( var k = 0; k < backBtn.length; k++) {
                backBtn[0].onclick = function() {
                    modal.classList.remove('open')
                    authForm1.classList.remove('open')
                    authForm2.classList.remove('open')
                }

                backBtn[1].onclick = function() {
                    modal.classList.remove('open')
                    authForm1.classList.remove('open')
                    authForm2.classList.remove('open')
                }
            }

            for(var l = 0; l < changeForm.length; l++) {
                changeForm[0].onclick = function() {
                    authForm1.classList.remove('open')
                    authForm2.classList.add('open')
                }

                changeForm[1].onclick = function() {
                    authForm2.classList.remove('open')
                    authForm1.classList.add('open')
                }
            }

            overlay.onclick = function() {
                modal.classList.remove('open')
                authForm1.classList.remove('open')
                authForm2.classList.remove('open')
            }
        }
    }
}

registrationLogin()


// Xử lý hành vi Validate
function Validator(options) {
    function Validate(inputElement, rule) {
        var errorElement = inputElement.parentElement.querySelector(options.formMessage)
        var errorMessage;
        var rules = inputElement[rule.selector]

        for( var i = 0; i < rules.length; i++) {
            errorMessage = rules[i](inputElement.value)
            if(errorMessage) break;
        }
        
        if(errorMessage) {
            errorElement.innerText = errorMessage;
            inputElement.parentElement.classList.add('invalid')
        } else {
            errorElement.innerText = '';
            inputElement.parentElement.classList.remove('invalid')
        }

        return !errorMessage;
    }

    function handleOninput(inputElement) {
        var errorElement = inputElement.parentElement.querySelector(options.formMessage)
        errorElement.innerText = '';
        inputElement.parentElement.classList.remove('invalid')
    }

    var authForm = document.querySelector(options.form)

    if(authForm) {
        options.rules.forEach(function(rule) {
            var inputElement = authForm.querySelector(rule.selector)
            
            if(Array.isArray(inputElement[rule.selector])) {
                inputElement[rule.selector].push(rule.test)
            } else {
                inputElement[rule.selector] = [rule.test]
            }

            inputElement.onblur = function() {
                Validate(inputElement, rule)
            }
            inputElement.oninput = function() {
                handleOninput(inputElement, rule)
            }
        }) 

        var confirmBtns = authForm.querySelector('.auth-form__confirm')
        confirmBtns.onclick = function() {
            var isFormValid = true;
            options.rules.forEach(function (rule) {
                var inputElement = authForm.querySelector(rule.selector)
                var isValid = Validate(inputElement, rule)
                if (!isValid) {
                    isFormValid = false;
                }
            })   

            if (isFormValid) {
                if (typeof options.onSubmit === 'function') {
                    var enableInputs = authForm.querySelectorAll('[name]')

                    var formValues = Array.from(enableInputs).reduce(function (values,input){
                        return (values[input.name] = input.value) && values;
                    },{})

                    options.onSubmit(formValues)
                }
            }
        }
        
    }
}

Validator.isRequired = function(selector) {
    return {
        selector: selector,
        test: function(value) {
            return value ? undefined : 'Nhập vào trường này đi tk lờ'
        }
    }
}

Validator.isEmail = function(selector) {
    return {
        selector: selector,
        test: function(value) {
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(value) ? undefined : 'Dm trường này phải là email'
        }
    }
}

Validator.isPassword = function(selector,min) {
    return {
        selector: selector,
        test: function(value) {
            return value.length >= min ? undefined : 'Tối thiểu 6 kí tự lận đó tk lờ'
        }
    }
}

Validator.ispassword_confirmation = function(selector,confirmation) {
    return {
        selector: selector,
        test: function(value) {
            return value === confirmation() ? undefined : 'Giá trị nhập lại sai rồi tk lờ ơi'
        }
    }
}
