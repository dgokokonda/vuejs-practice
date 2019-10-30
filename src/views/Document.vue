<template>
    <div>
        <Popup
            v-show="visible"
            :visible="visible"
            @toggle-display="toggleVisible"/>
        <form @submit.prevent="someAction" novalidate class="form">
            <h2>Документ</h2>
            <div class="form__line">
                <label>passport number</label>
                <the-mask 
                    v-model.lazy="form.passportData" 
                    @blur.native="onBlur"
                    mask="#### ######"
                    :masked="true"
                    placeholder="1111 111111"
                    name="passportData">
                </the-mask>
                <span v-if="$v.form.passportData.$error">
                    Серия и номер паспорта должны быть в формате 1234 567890
                </span>
            </div>

            <div class="form__line">
                <label>passport date</label>
                <the-mask
                    v-model.lazy.trim="form.passportDate"
                    @blur.native="onBlur"
                    mask="##.##.####"
                    :masked="true"
                    placeholder="12.12.2000"
                    name="passportDate">
                </the-mask>
                <span v-if="$v.form.passportDate.$error">
                    Дата должна быть в формате ДД.ММ.ГГГГ
                </span>
            </div>

            <div class="form__line">
                <label>fio</label>
                <input
                    type="text"
                    v-model.lazy.trim="form.name"
                    @blur="onBlur"
                    name="name">
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

            <div class="form__line">
                <label>new password</label>
                <input
                    type="password"
                    v-model.lazy.trim="form.password"
                    @blur="onBlur"
                    name="password">
                <span v-if="$v.form.password.$error">
                    <template v-if="!$v.form.password.minLength">
                        Длина пароля должна быть не менее {{ $v.form.password.$params.minLength.min }} символов
                    </template>
                    <template v-else-if="!$v.form.password.maxLength">
                        Длина пароля должна быть не более {{ $v.form.password.$params.maxLength.max }} символов
                    </template>
                    <template v-else-if="!$v.form.password.alphaNum">
                        Пароль легко угадать
                    </template>
                    <template v-else>
                        Введите пароль
                    </template>
                </span>
            </div>

            <div class="form__line">
                <label>repeat password</label>
                <input
                    type="password"
                    v-model.lazy.trim="form.repeatPassword"
                    @blur="onBlur"
                    name="repeatPassword">
                <span v-if="$v.form.repeatPassword.$error">
                    <template v-if="!$v.form.repeatPassword.sameAsPassword">
                        Пароли не совпадают
                    </template>
                    <template v-else>
                        Повторите пароль
                    </template>
                </span>
            </div>
            <div class="form__line">
                <label>email</label>
                <input
                    type="email"
                    v-model.lazy="form.email"
                    @blur="onBlur"
                    name="email">
                <span v-if="$v.form.email.$error">
                    <template v-if="!$v.form.email.email">
                        Введите корректный email
                    </template>
                </span>
            </div>
            <div class="form__line">
                <label>username</label>
                <input
                    type="text"
                    v-model.lazy.trim="form.username"
                    @blur="onBlur"
                    name="username">
                <span v-if="$v.form.username.$error">
                    <template v-if="!$v.form.username.alphaNum">
                        Введите корректный логин. Для логина допустимы символы латиницы, цифр, дефиса, подчеркивания от 3 до 16 символов
                    </template>
                    <template v-else-if="!$v.form.username.minLength">
                        Длина логина должна быть не менее {{ $v.form.username.$params.minLength.min }} символов
                    </template>
                    <template v-else-if="!$v.form.username.maxLength">
                        Длина логина должна быть не более {{ $v.form.username.$params.maxLength.max }} символов
                    </template>
                </span>
            </div>
            <div class="form__line">
                <label>ИНН</label>
                <input
                    type="number"
                    v-model.lazy.number="form.inn"
                    @blur="onBlur"
                    name="inn">
                <span v-if="$v.form.inn.$error">
                    <template v-if="!$v.form.inn.numeric">
                        Допустим только ввод цифр
                    </template>
                    <template v-else-if="!$v.form.inn.isValidLength">
                        ИНН может содержать только 10 или 12 цифр
                    </template>
                    <template v-else>
                        Заполните поле ИНН
                    </template>
                </span>
            </div>
            <div class="form__line">
                <label>Телефон</label>
                <the-mask
                    type="tel"
                    v-model.lazy="form.phone"
                    @blur.native="onBlur"
                    name="phone"
                    mask="8 (###) ###-##-##"
                    :masked="true"
                    placeholder="8 (999) 999-99-99">
                </the-mask>
                <span v-if="$v.form.phone.$error">
                    <template v-if="!$v.form.phone.masked">
                        Поле обязательно к заполнению. Проверьте правильность заполнения номера телефона
                    </template>
                </span>
            </div>
            <div class="form__line">
                <label>Адрес</label>
                <input
                    type="text"
                    v-model.lazy.trim="form.address"
                    @blur="onBlur"
                    name="address">
                <span v-if="$v.form.address.$error">
                    <template v-if="!$v.form.address.maxLength">
                        Длина адреса должна быть не более {{ $v.form.address.$params.maxLength.max }} символов
                    </template>
                </span>
            </div>
            <div class="form__line">
                <input
                    type="checkbox"
                    v-model="form.age"
                    @change="onChange"
                    name="age" >
                <label>Подтверждаю, что являюсь совершеннолетним гражданином</label>
                <span v-if="$v.form.age.$error">
                    <template>
                        Нужно подтвердить свой возраст
                    </template>
                </span>
            </div>
            <div class="form__line">
                <label>Birthday</label>
                <datepicker
                    :value="form.birthday"
                    format="dd.MM.yyyy"
                    typeable
                    :language="ru" 
                    name="birthday"
                    @input="form.birthday = fixDate($event)"
                    @selected="onDateSelected('birthday')">
                </datepicker>
                <span v-if="$v.form.birthday.$error">
                    <template>
                        Не выбрана дата
                    </template>
                </span>
            </div>
            <div class="form__line">
                <label>Комментарий</label>
                <textarea name="comment" v-model.lazy="form.comment" @blur="onBlur"></textarea>
                <span v-if="$v.form.comment.$invalid">
                    <template v-if="!$v.form.comment.maxLength">
                        Допустим ввод не более 50 символов
                    </template>
                </span>
            </div>
            <!-- sum, textarea, file loader -->

            <button type="submit" :disabled="$v.$invalid">
            Отправить форму
            </button>
        </form>
    </div>
</template>

<script>
import { store } from '../store'
import {mask} from 'vue-the-mask'
import {TheMask} from 'vue-the-mask'
import Datepicker from 'vuejs-datepicker'
import {ru} from 'vuejs-datepicker/dist/locale'
import { required, maxLength, minLength, sameAs, numeric } from 'vuelidate/lib/validators';
import moment from 'moment';
import Popup from '../components/Popup'

const alpha = val => /^[а-яёa-z\s]*$/i.test(val);
const alphaNum = val => /^[a-z0-9_-]*$/i.test(val);
const phonePattern = /^[8]\s\([0-9]{3}\)\s[0-9]{3}-[0-9]{2}-[0-9]{2}$/;

export default {
    store,
    props: ['visible', 'toggle-display'],
    data() {
        return {
            ru,
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
                age: false,
                birthday: null,
                comment: null
            }
        };
    },
    directives: {mask},
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
                masked: val => phonePattern.test(val)
            },
            address: {
                // not-required field
                maxLength: maxLength(50)
            },
            age: {
                required,
            },
            birthday: {
                required,
                masked: val => /^[0-9]{2}.[0-9]{2}.[0-9]{4}$/.test(val)
            },
            comment: {
                // required,
                maxLength: maxLength(50)
            }
        }
    },
    methods: {
        setStorage(name, value) {
            const field = this.$v.form[name];
            field.$touch();

            if (!field.$error && !field.$invalid || !value) {
                this.$store.dispatch('addField', [name, value]);
            }
        },
        someAction() {
            alert('success')
            // this.visible = true;
            this.$emit('toggle-display', !this.visible);
        },
        onBlur(e) {
            const { name, value } = e.target;
            this.setStorage(name, value);
        },
        onChange(e) {
            const { name, checked } = e.target;
            this.setStorage(name, checked);
        },
        onDateSelected(name) {
            const date = this.$v.form[name];
            date.$touch();

            this.$nextTick(function(){
                if (!date.$error && !date.$invalid) {
                    this.$store.dispatch('addField', [name, this.form[name]]);
                }
            });
        },
        fixDate(e) {
            return e.toLocaleDateString(); 
        },
        toggleVisible(data) {
            this.$emit('toggle-display', data)
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
    },
    components: {
        TheMask,
        Datepicker,
        Popup
    }
};
</script>

<style scoped lang="sass">
    .form
        margin: 0 auto
        width: 500px
        text-align: left
        &__line
            margin-bottom: 20px
        label
            margin-bottom: 5px
        textarea,
        input
            &:not([type="checkbox"]):not([type="radio"])
                width: 100%
            &[type="checkbox"]
                width: 20px
                height: 20px
        span
            color: red
</style>