import { facebookIcon, googleIcon } from "@/assets/icons";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import envConfig from "@/config/envConfig";

function SocialLogin() {
    // utils/google.ts
    const loginWithGoogle = () => {
        const params = new URLSearchParams({
            client_id: envConfig.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
            redirect_uri: `${envConfig.BASE_URL}/auth/google/callback`,
            response_type: "code",
            scope: "openid email profile",
            prompt: "select_account",
        });

        window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
    };

    const loginWithFacebook = () => {
        const params = new URLSearchParams({
            client_id: envConfig.NEXT_PUBLIC_FACEBOOK_APP_ID!,
            redirect_uri: `${envConfig.BASE_URL}/auth/facebook/callback`,
            response_type: "code",
            scope: "email,public_profile",
        });

        window.location.href = `https://www.facebook.com/v19.0/dialog/oauth?${params.toString()}`;
    };

    return (
        <Field className="flex flex-col gap-3">
            {/* Google Signup */}
            <Button
                variant="outline"
                type="button"
                className="flex items-center justify-center gap-2"
                onClick={loginWithGoogle}
            >
                {googleIcon}
                Sign up with Google
            </Button>

            {/* Facebook Signup */}
            <Button
                variant="outline"
                type="button"
                className="flex items-center justify-center gap-2 bg-blue-600 text-white hover:bg-blue-700"
                onClick={loginWithFacebook}
            >
                {facebookIcon}
                Sign up with Facebook
            </Button>
        </Field>
    );
}

export default SocialLogin;
