import { FieldValues, Path, UseFormSetError } from "react-hook-form";

type BackendError<Field extends keyof any> = {
    field: Field;
    message: string;
    code: string;
};

const authCode = {
    FIELD_REQUIRED: "FIELD_REQUIRED",
    USERNAME_INVALID: "USERNAME_INVALID",
    EMAIL_INVALID: "EMAIL_INVALID",
    PASSWORD_WEAK: "PASSWORD_WEAK",
    PASSWORD_MISMATCH: "PASSWORD_MISMATCH",
    SERVER_ERROR: "SERVER_ERROR",
    FIELD_ALREADY_EXISTS: "FIELD_ALREADY_EXISTS",
    INVALID_PASSWORD: "INVALID_PASSWORD",
    USER_NOT_FOUND: "USER_NOT_FOUND",
    INVALID_TOKEN: "INVALID_TOKEN",
    TOKEN_EXPIRED: "TOKEN_EXPIRED",
    UNAUTHORIZED: "UNAUTHORIZED",
};

/**
 * Map code lỗi sang message tiếng Việt (hoặc i18n sau này)
 */
export function mapErrorCodeToMessage(code: string): string {
    switch (code) {
        case authCode.FIELD_REQUIRED:
            return "Trường này không được để trống";
        case authCode.USERNAME_INVALID:
            return "Tên đăng nhập không hợp lệ hoặc chứa khoảng trắng";
        case authCode.EMAIL_INVALID:
            return "Email không hợp lệ";
        case authCode.INVALID_PASSWORD:
            return "Mật khẩu không chính xác";
        case authCode.PASSWORD_WEAK:
            return "Mật khẩu phải có chữ hoa, chữ thường và số, tối thiểu 6 ký tự";
        case authCode.PASSWORD_MISMATCH:
            return "Mật khẩu xác nhận không khớp";
        case authCode.FIELD_ALREADY_EXISTS:
            return "Trường này đã tồn tại";
        default:
            return "Có lỗi xảy ra. Vui lòng thử lại!";
    }
}

/**
 * Dùng chung để set lỗi backend cho react-hook-form
 */
export function setFormErrors<T extends FieldValues>(
    errors: BackendError<keyof T>[],
    setError: UseFormSetError<T>,
) {
    errors.forEach((error) => {
        setError(error.field as Path<T>, {
            type: "server",
            message: mapErrorCodeToMessage(error.code),
        });
    });
}
