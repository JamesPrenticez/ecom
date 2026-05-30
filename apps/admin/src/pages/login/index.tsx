import styled from '@emotion/styled';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/auth';

const Page = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100dvh;
  background: var(--admin-bg);
`;

const Card = styled.div`
  width: 100%;
  max-width: 38rem;
  background: var(--admin-surface);
  border: 1px solid var(--admin-border);
  border-radius: 1.4rem;
  padding: 3.2rem;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
`;

const Title = styled.h1`
  font-size: 2.4rem;
  font-weight: 700;
  color: var(--text-primary, #f0f8ff);
  margin: 0;
`;

const Sub = styled.p`
  font-size: 1.4rem;
  color: var(--text-muted, #6a6e69);
  margin: 0;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;

const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
`;

const Label = styled.label`
  font-size: 1.2rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text-muted, #6a6e69);
`;

const Input = styled.input`
  padding: 1rem 1.2rem;
  border-radius: 0.8rem;
  border: 1px solid var(--admin-border);
  background: rgba(255,255,255,0.03);
  color: var(--text-primary, #f0f8ff);
  font-size: 1.4rem;
  font-family: inherit;
  outline: none;
  transition: border-color 0.15s;

  &:focus { border-color: var(--color-primary, #00b9e2); }
`;

const ErrorText = styled.p`
  font-size: 1.3rem;
  color: #e57373;
  margin: 0;
  text-align: center;
`;

const SubmitBtn = styled.button<{ loading: boolean }>`
  padding: 1.1rem;
  border-radius: 0.8rem;
  border: none;
  background: var(--color-primary, #00b9e2);
  color: #fff;
  font-size: 1.4rem;
  font-weight: 700;
  cursor: ${({ loading }) => loading ? 'not-allowed' : 'pointer'};
  font-family: inherit;
  opacity: ${({ loading }) => loading ? 0.7 : 1};
  transition: background 0.15s, opacity 0.15s;

  &:hover:not(:disabled) { background: var(--color-primary-accent, #0082a8); }
`;

export const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('admin@example.com');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await login(email, password);
      navigate('/products', { replace: true });
    } catch {
      setError('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Page>
      <Card>
        <Header>
          <Title>Wild Wash Admin</Title>
          <Sub>Sign in to manage your store</Sub>
        </Header>
        <Form onSubmit={handleSubmit}>
          <FieldGroup>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </FieldGroup>
          <FieldGroup>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </FieldGroup>
          {error && <ErrorText>{error}</ErrorText>}
          <SubmitBtn type="submit" loading={loading} disabled={loading}>
            {loading ? 'Signing in…' : 'Sign in'}
          </SubmitBtn>
        </Form>
      </Card>
    </Page>
  );
};
