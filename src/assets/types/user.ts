type user = {
    id?: number, name: string,
    logo?: string, gym_name: string, email: string, phone: number
}
type trainer = {

    id?: number, name: string, t_image?: string,
    payment?: string, gender: string, email: string, phone: number, DOB?: string, T_Payments?: t_payment[]
}
type member = {
    id?: number, name: string, occupation: string, weight_kg: number, height_cm: number, blood_group: string, program: string, m_image?: any,
    payment?: string, gender: string, email: string, phone: number, DOB?: string, status: number, M_Payments?: m_payment[], join_date?: string, attendance?: attendance[]

}

type m_payment = {
    id?: number, start_date: string, end_date: string, total_month: string, fee: number
}
type t_payment = {
    id?: number, start_date: string, end_date: string, total_month: string, fee: number
}
type attendance = {
    id?: number, date: string, time: string,
}

export type { user, trainer, member, m_payment, t_payment }