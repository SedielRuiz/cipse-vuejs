<template>
	<div class="session-wrapper ">
		<div class="container">
			<div class="row justify-content-center">
				<div class="col-lg-5 col-md-7 col-sm-12 col-xs-12 ">
					<div class="session-block d-block">
						<div class="text-center mb-30">
							<div class="mb-20">
								<img class="img-fluid rounded-circle" width="150" height="150" src="/static/img/LogoCIPSE_800.png" />
							</div>
							<h3 class="mb-20">{{$t('message.login')}}</h3>
						</div>
                        <b-form>
                            <b-form-group id="exampleInputGroup1" label="Correo electrónico" label-for="emailInput1">
                                <b-form-input id="emailInput1" type="email" v-model="form.email" required
                                    placeholder="Ingrese su correo">
                                </b-form-input>
                            </b-form-group>
                            <b-form-group id="exampleInputGroup2" label="Contraseña" label-for="passwordInput1">
                                <b-form-input id="passwordInput1" type="password" v-model="form.password" required
                                    placeholder="Ingrese su contraseña">
                                </b-form-input>
                            </b-form-group>
                            <div class="d-flex justify-content-between align-items-center mb-15">
                                <b-form-group id="exampleGroup4" class="mb-0">
                                    <b-form-checkbox value="me">{{$t('message.rememberMe')}}</b-form-checkbox>
                                </b-form-group>
                                <a href="javascript:;"
                                    class="text-danger text-center fs-12 d-block">{{$t('message.forgotPassword')}}</a>
                            </div>
                            <b-button @click="submit" variant="primary" class="session-btn mb-15">{{$t('message.login')}}
                            </b-button>
                            <!-- <a href="javascript:void(0)" @click="onCreateAccount"
                                class="text-center fs-12 d-block text-success">{{$t('message.dontHaveAnAccount')}}</a> -->
                        </b-form>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import firebase from "firebase/app";
	import AuthService from "../../auth/AuthService";

	const auth = new AuthService();
	const { login, logout, authenticated, authNotifier } = auth;

	export default {
		data: function () {
			return {
				form: {
					email: '',
					password: '',
				}
			}
		},
		methods: {
			submit() {
				// evt.preventDefault();
				const user = {
					email: this.form.email,
					password: this.form.password
				};
				this.$store.dispatch("signinUserInFirebase", {
					user
				});
			},
			signInWithFacebook() {
				this.$store.dispatch("signinUserWithFacebook");
			},
			signInWithGoogle() {
				this.$store.dispatch("signinUserWithGoogle");
			},
			signInWithTwitter() {
				this.$store.dispatch("signinUserWithTwitter");
			},
			signInWithGithub() {
				this.$store.dispatch("signinUserWithGithub");
			},
			signinWithAuth0() {
				login();
			},
			onCreateAccount() {
				this.$router.push("/session/sign-up");
			}
		}
	}
</script>