import { useRouter } from 'next/router';

export interface IChatProps {}

export default function Chat(props: IChatProps) {
    const router = useRouter();
    return <>{router.query.id}</>;
}
