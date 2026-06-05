# Clients

One directory per client: `clients/<client-slug>/`

## Create a new client

```text
Copy:  clients/_template-client/
To:    clients/acme-corp/
```

Update `README.md` inside the new folder with contacts, stack, and folder conventions.

## Naming

- Slug: lowercase, hyphens, no spaces (`acme-corp`, not `Acme Corp`)
- Archive inactive clients under `<slug>/archive/` — do not delete historical reports
