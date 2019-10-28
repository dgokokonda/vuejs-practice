<template>
    <form @submit.prevent="someAction()" novalidate>
        <h2>Документ</h2>

        <div>
        <label>passport number</label>
        <input type="text" v-model.lazy.trim="form.passportData" @blur="onBlur" name="passportData">
        <span v-if="$v.form.passportData.$error">
            Серия и номер паспорта должны быть в формате 1234 567890
        </span>
        </div>

        <div>
            <label>passport date</label>
        <input type="text" v-model.lazy.trim="form.passportDate" @blur="onBlur" name="passportDate">
        <span v-if="$v.form.passportDate.$error">
            Дата должна быть в формате ДД.ММ.ГГГГ
        </span>
        </div>

        <div>
            <label>fio</label>
        <input type="text" v-model.lazy.trim="form.name" @blur="onBlur" name="name">
        <span v-if="$v.form.name.$error">
            <template v-if="!$v.form.name.maxLength">
            Длина имени не должна превышать {{ $v.form.name.$params.maxLength.max }} символов
            </template>
            <template v-else-if="!$v.form.name.alpha">
            Имя должно содержать только буквы
            </template>
            <template v-else>
            Имя обязательно для заполнения
            </template>
        </span>
        </div>

        <div>
            <label>new password</label>
            <input type="password" v-model.lazy.trim="form.password" @blur="onBlur" name="password">
            <span v-if="$v.form.password.$error">
                <template v-if="!$v.form.password.minLength">Длина пароля должна быть не менее {{ $v.form.password.$params.minLength.min }} символов</template>
                <template v-else-if="!$v.form.password.maxLength">Длина пароля должна быть не более {{ $v.form.password.$params.maxLength.max }} символов</template>
                <template v-else-if="!$v.form.password.alphaNum">Пароль легко угадать</template>
                <template v-else>Введите пароль</template>
            </span>
        </div>

        <div>
            <label>repeat password</label>
            <input type="password" v-model.lazy.trim="form.repeatPassword" @blur="onBlur" name="repeatPassword">
            <span v-if="$v.form.repeatPassword.$error">
                <template v-if="!$v.form.repeatPassword.sameAsPassword">Пароли не совпадают</template>
                <template v-else>Повторите пароль</template>
            </span>
        </div>
        <div>
            <label>email</label>
            <input type="email" v-model.lazy="form.email" @blur="onBlur" name="email">
            <span v-if="$v.form.email.$error">
                <template v-if="!$v.form.email.email">Введите корректный email</template>
            </span>
        </div>
        <div>
            <label>username</label>
            <input type="text" v-model.lazy.trim="form.username" @blur="onBlur" name="username">
            <span v-if="$v.form.username.$error">
                <template v-if="!$v.form.username.alphaNum">Введите корректный логин. Для логина допустимы символы латиницы, цифр, дефиса, подчеркивания от 3 до 16 символов</template>
                <template v-else-if="!$v.form.username.minLength">Длина логина должна быть не менее {{ $v.form.username.$params.minLength.min }} символов</template>
                <template v-else-if="!$v.form.username.maxLength">Длина логина должна быть не более {{ $v.form.username.$params.maxLength.max }} символов</template>
            </span>
        </div>
        <div>
            <label>ИНН</label>
            <input type="number" v-model.lazy.number="form.inn" @blur="onBlur" name="inn">
            <span v-if="$v.form.inn.$error">
                <template v-if="!$v.form.inn.numeric">Допустим только ввод цифр</template>
                <template v-else-if="!$v.form.inn.isValidLength">ИНН может содержать только 10 или 12 цифр</template>
                <template v-else>Заполните поле ИНН</template>
            </span>
        </div>
        <div>
            <label>Телефон</label>
            <input type="number" v-model.lazy.number="form.phone" @blur="onBlur" name="phone">
            <span v-if="$v.form.phone.$error">
                <template v-if="!$v.form.phone.numeric">Допустим только ввод цифр</template>
                <template v-else>Заполните поле Телефон</template>
            </span>
        </div>
        <div>
            <label>Адрес</label>
            <input type="text" v-model.lazy.trim="form.address" @blur="onBlur" name="address">
            <span v-if="$v.form.address.$error">
                <template v-if="!$v.form.address.maxLength">Длина адреса должна быть не  более {{ $v.form.address.$params.maxLength.max }} символов</template>
            </span>
        </div>
        <div>
            <input type="checkbox" v-model="form.age" @change="onBlur" name="age">
            <label>Подтверждаю, что являюсь совершеннолетним гражданином</label>
            <span v-if="$v.form.age.$error">
                <template>Нужно подтвердить свой возраст</template>
            </span>
        </div>
        <!-- sum, date-picker, textarea, file loader -->

        <button type="submit" :disabled="$v.$invalid">
        Отправить форму
        </button>
    </form>
</template>

<script>
import { store } from '../store'
import { required, maxLength, minLength, sameAs, numeric } from 'vuelidate/lib/validators';
import moment from 'moment';

const alpha = val => /^[а-яёa-z\s]*$/i.test(val);
const alphaNum = val => /^[a-z0-9_-]*$/i.test(val);

export default {
    store,
    data() {
        return {
            form: {
                passportData: null,
                name: null,
                passportDate: null,
                password: null,
                repeatPassword: null,
                email : null,
                username: null,
                inn: null,
                phone: null,
                address: null,
                age: null
            }
        };
    },

    // Модель для валидации, которую Vuelidate превратит в computed-поле $v
    validations: {
        form: {
            // Название поля должно совпадать с полем в data
            passportData: {
                required,
                validFormat: val => /^\d{4} \d{6}$/.test(val),
            },
                passportDate: {
                required,
                validDate: val => moment(val, 'DD.MM.YYYY', true).isValid(),
            },
            name: {
                required,
                maxLength: maxLength(32),
                alpha
            },
            password: {
                //  /^[\w_]{8,32}
                required,
                minLength: minLength(8),
                maxLength: maxLength(32),
                alphaNum
            },
            repeatPassword: {
                required,
                sameAsPassword: sameAs('password')
            },
            email: {
                required,
                email: val => /^.+@.+\..+/i.test(val)
            },
            username: {
                required,
                alphaNum,
                minLength: minLength(3),
                maxLength: maxLength(16)
            },
            inn: {
                required,
                numeric,
                isValidLength: val => String(val).length === 10 || String(val).length === 12
            },
            phone: {
                required,
                numeric
            },
            address: {
                // not-required field
                maxLength: maxLength(50)
            },
            age: {
                required,
            }
        }
    },
    methods: {
        someAction() {
            alert('success')
        },
        onBlur(e) {
            const {name, value} = e.target;
            const field = this.$v.form[name];
            field.$touch();

            if (!field.$error && !field.$invalid) {
                this.$store.dispatch('addField', [name, value]);
            }
        }
    },
    watch: {
        form: {
            immediate: true,
            handler: function() {
                const form = this.$store.getters.fields;
                for(let key in form) {
                    // this.form[key] = form[key]
                    this.$set(this.form, key, form[key]);
                }
            }
            
        }
    }
};
</script>

<style scoped lang="sass">
    form
        div
            width: 500px
            margin: 0 auto 20px
            text-align: left
        label
            margin-bottom: 5px
        input
            &:not([type="checkbox"]):not([type="radio"])
                width: 100%
            &[type="checkbox"]
                width: 20px
                height: 20px
        span
            color: red
</style>