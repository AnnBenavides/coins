from django.shortcuts import render, get_object_or_404, redirect
from .models import Alumno, Grupo, Profesor, Bloque, Bien, Historial
from .forms import BienForm, BloqueForm, CargaForm


# Create your views here.
def getAlumno(usuario):
	return get_object_or_404(Alumno, user=usuario)

def getProfesor(usuario):
	return get_object_or_404(Profesor, user=usuario)

def users_list(request):
	profesores = Profesor.objects.all()
	alumnos = Alumno.objects.all().order_by('grupo')
	bienes = Bien.objects.all()
	user = request.user
	return render(request, 'app/users_list.html', {'profesores' : profesores, 'alumnos' : alumnos, 'bienes' : bienes})

def perfil_profe(request,pk):
	profe = get_object_or_404(Profesor, pk=pk)
	bloques = Bloque.objects.filter(profe=profe).order_by('dia')
	user = request.user
	return render(request, 'app/perfil_profe.html', {'profe' : profe, 'bloques': bloques})
	
def perfil_alumno(request,pk):
	alumno = get_object_or_404(Alumno, pk=pk)
	user = request.user
	return render(request, 'app/perfil_alumno.html', {'alumno' : alumno})
	
def ayuda(request,pk):
	user = getProfesor(request.user)
	alumno = get_object_or_404(Alumno, pk=pk)
	alumno.cargar(2)
	nombre = "Compra ayuda a "+str(alumno)
	h = Historial.objects.create(user=user, asunto=nombre, valor='2')
	return render(request, 'app/perfil_alumno.html', {'alumno' : alumno})


def bien(request,pk):
	user =request.user
	bien = get_object_or_404(Bien, pk=pk)
	alumno = getAlumno(request.user)
	alumno.cargar(bien.valor)
	nombre = "Compra de bien "+str(alumno)
	h = Historial.objects.create(user=request.user, asunto=nombre, valor=bien.valor)
	return render(request, 'app/perfil_alumno.html', {'alumno' : alumno})

def nuevo_bien(request):
	user =request.user	
	if request.method == "POST":
		form = BienForm(request.POST)
		if form.is_valid():
			post = form.save(commit=False)
			profe = getProfesor(request.user)
			h = Historial.objects.create(user=request.user, asunto='Crear bien', valor='0')
			post.save()
			return render(request, 'app/perfil_profe.html', {'profe' : profe})
	else:
		form = BienForm()
		return render(request,'app/nuevo_bien.html', {'form':form})

def nuevo_bloque(request):
	if request.method == "POST":
		form = BloqueForm(request.POST)
		if form.is_valid():
			bloque = form.save(commit=False)
			bloque.profe = getProfesor(request.user)
			bloque.save()
			h = Historial.objects.create(user=request.user, asunto='Crear bloque', valor=bloque.valor)
			return render(request, 'app/perfil_profe.html', {'profe' : bloque.profe})
	else:
		form = BloqueForm()
		return render(request, 'app/nuevo_bloque.html', {'form':form})

def editar_bloque(request,pk):
	bloque = get_object_or_404(Bloque, pk=pk)
	if request.method == "POST":
		form = BloqueForm(request.POST, instance=bloque)
		if form.is_valid():
			bloque = form.save(commit=False)
			bloque.profe = getProfesor(request.user)
			bloque.save()
			h = Historial.objects.create(user=request.user, asunto='Cambio en bloque', valor=bloque.valor)
			return render(request, 'app/perfil_profe.html', {'profe' : bloque.profe})
	else:
		form = BloqueForm()
		return render(request, 'app/nuevo_bloque.html', {'form':form})


def comprar_bloque(request,pk):
	bloque = get_object_or_404(Bloque, pk=pk)
	alumno = getAlumno(request.user)
	alumno.cargar(bien.valor)
	bloque.comprado(alumno.grupo)
	nombre = "Compra bloque "+str(bloque.profe)
	h = Historial.objects.create(user=request.user, asunto=nombre, valor=bloque.valor)
	return users_list(request)

def borrar_bloque(request,pk):
	bloque = get_object_or_404(Bloque, pk=pk)
	user =request.user
	profesor = getProfesor(request.user)
	nombre = "Borrar bloque "+str(bloque)
	bloque.delete()
	h = Historial.objects.create(user=request.user, asunto=nombre, valor=0)
	return users_list(request)

def cargar_coins(request, pk, coin):
	if request.method == "POST":
		form = CargaForm(request.POST)
		if form.is_valid():
			carga = form.save(commit=False)
			carga.profesor = getProfesor(request.user)
			carga.save()
			nombre = "Carga a "+ str(carga.alumno)
			h = Historial.objects.create(user=request.user, asunto='Crear bloque', valor=carga.carga)
			return render(request, 'app/perfil_alumno.html', {'alumno' : carga.alumno})
	else:
		form = CargaForm()
		return render(request, 'app/cargar_coins.html', {'form':form})