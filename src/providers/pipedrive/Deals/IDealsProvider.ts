/* eslint-disable camelcase */
export interface DealProvider {
    id: number;
    creator_user_id: any;
    user_id: any;
    person_id: any;
    org_id: any;
    stage_id: number;
    title: string;
    value: number;
    currency: string;
    add_time: string;
    update_time: string;
    stage_change_time: string;
    active: boolean;
    deleted: boolean;
    status: string;
    probability: string | null;
    next_activity_date: string | null;
    next_activity_time: string | null;
    next_activity_id: number | null;
    last_activity_date: string;
    last_activity_id: number | null;
    lost_reason: string | null;
    visible_to: string;
    close_time: string | null;
    pipeline_id: number;
    won_time: string | null;
    first_won_time: string | null;
    lost_time: string | null;
    products_count: number;
    files_count: number;
    notes_count: number;
    followers_count: number;
    email_messages_count: number;
    activities_count: number;
    done_activities_count: number;
    undone_activities_count: number;
    participants_count: number;
    expected_close_date: string;
    last_incoming_mail_time: string | null;
    last_outgoing_mail_time: string | null;
    label: string | null;
    stage_order_nr: number;
    person_name: string;
    org_name: string;
    next_activity_subject: string | null;
    next_activity_type: string | null;
    next_activity_duration: string | null;
    next_activity_note: string | null;
    formatted_value: string;
    weighted_value: number;
    formatted_weighted_value: number;
    weighted_value_currency: string;
    rotten_time: string | null;
    owner_name: string;
    cc_email: string;
    org_hidden: boolean;
    person_hidden: boolean;
}

export interface IDealsProvider {
    getDeals(): Promise<Array<DealProvider>>;
}
